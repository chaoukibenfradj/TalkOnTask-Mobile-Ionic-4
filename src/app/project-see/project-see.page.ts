import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from './../services/task.service';
import { ProjectService } from './../services/project.service';
import { Project } from './../models/project.model';
import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { UIService } from '../services/ui.service';
import { User } from '../models/user.model';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TaskRequest } from '../models/task-request.model';


@Component({
  selector: 'app-project-see',
  templateUrl: './project-see.page.html',
  styleUrls: ['./project-see.page.scss'],
})
export class ProjectSeePage implements OnInit, AfterViewInit {

  projectId: string;
  currentproject: Project;
  listTasks: Task[] = [];
  listMyTasks: Task[] = [];
  currentuser: User;
  actionSheetShowed = false;


  testArray = [
    {
      'name': 'To Do',
      'value': 10,
      'extra': {
        'code': 'de'
      }
    },
    {
      'name': 'Doing',
      'value': 2,
      'extra': {
        'code': 'us'
      }
    },
    {
      'name': 'Done',
      'value': 3,
      'extra': {
        'code': 'fr'
      }
    }
  ];

  view: any;
  colorScheme = {
    domain: ['#f04141', '#ffce00', '#10dc60']
  };


  constructor(
    private uiService: UIService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private taskService: TaskService,
    private toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private authService: AuthService) {
    this.view = [innerWidth / 1.1, 200];
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.1, 200];
  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      this.projectId = data.get('id');
      console.log('Params passed through routing=>', this.projectId);
      this.seeProject();
      this.getAllTasksByProjectId();
      this.currentuser = this.authService.getUser();
    });
  }
  seeProject() {
    this.uiService.startLoading();
    this.projectService.seeProject(this.projectId)
      .subscribe(data => {
        this.currentproject = data.data;
        console.log(data);
        this.uiService.stopLoading();
      }, err => {
        console.log(err);
        this.uiService.stopLoading();
      });
  }

  getAllTasksByProjectId() {
    this.taskService.getAllTasksByProjectId(this.projectId)
      .subscribe(data => {
        console.log('Tasks Data =>', data);
        this.listTasks = data.data;
        if (this.currentuser && this.currentuser.userRole === 'dev') {
          this.listMyTasks = this.listTasks.filter((element) => element.devId === this.currentuser._id);
          this.listTasks = this.listTasks.filter((element) => element.devId !== this.currentuser._id);
        }
      }, err => {
        console.log(err);
      });
  }
  gotoTaskDetails(item) {
    this.router.navigate(['/task-details/' + item._id]);
  }
  async showTasksOption(status, item) {
    if (!this.actionSheetShowed) {
      this.actionSheetShowed = true;
      console.log(item);
      console.log(status);
      console.log('Show options');
      let actionSheet;
      if (this.currentuser.userRole === 'pm') {
        actionSheet = await this.actionSheetController.create({
          animated: true,
          backdropDismiss: true,
          keyboardClose: true,
          mode: 'md',
          header: 'Task',
          buttons: [{
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.deleteTask(item._id);
              this.actionSheetShowed = false;
            }
          }, {
            text: 'Details',
            icon: 'information-circle-outline',
            handler: () => {
              this.detailsTask(item);
              this.actionSheetShowed = false;
            }
          }, {
            text: 'Edit',
            icon: 'create',
            handler: () => {
              this.editTask(item);
              this.actionSheetShowed = false;
            }
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              this.actionSheetShowed = false;
            }
          }]
        });
      } else {
        // tslint:disable-next-line:prefer-const
        let actionsButtons = [{
          text: 'Details',
          icon: 'information-circle-outline',
          handler: () => {
            this.detailsTask(item);
            this.actionSheetShowed = false;
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.actionSheetShowed = false;
          }
        }];
        if (status === 1) {
          actionsButtons.push(
            {
              text: 'Send Working Request',
              icon: 'hand',
              handler: () => {
                this.taskWorkingRequest(item);
                this.actionSheetShowed = false;
              }
            }
          );
        }
        actionSheet = await this.actionSheetController.create({
          animated: true,
          backdropDismiss: true,
          keyboardClose: true,
          mode: 'md',
          header: 'Task',
          buttons: actionsButtons
        });
      }
      await actionSheet.present();
    }
  }
  async deleteTask(id) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Would you like to delete this task ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deletTaskById(id);
          }
        }
      ]
    });
    await alert.present();
  }
  editTask(item) {
    console.log('Edit =>', item);
    this.router.navigate(['/task-update/' + item._id]);
  }
  detailsTask(item) {
    this.gotoTaskDetails(item);
  }

  async taskWorkingRequest(item) {
    console.log('Working Request', item);
    const taskReq = {} as TaskRequest;
    taskReq.devId = this.currentuser._id;
    taskReq.taskId = item._id;
    taskReq.projectId = this.currentproject._id;
    console.log(taskReq);
    const toast = await this.toastController.create({
      message: `Working request on this task sent successfully !`,
      duration: 3000,
      animated: true,
      mode: 'ios',
      position: 'bottom',
      showCloseButton: true,
    });
    this.taskService.saveTaskRequest(taskReq)
      .subscribe(async (data) => {
        console.log(data);
        await toast.present();
      }, async (err) => {
        console.log(err);
        toast.message = 'A problem has been occured ! Please try again !';
        await toast.present();
      });
  }

  deletTaskById(id) {
    this.uiService.startLoading();
    this.taskService.deleteTask(id)
      .subscribe(data => {
        this.uiService.stopLoading();
        this.getAllTasksByProjectId();
      }, err => {
        this.uiService.stopLoading();
        console.log(err);
      });
  }

}
