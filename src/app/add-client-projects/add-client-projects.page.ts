import { convertBase64ToFile } from './../utils/misc/convert-base64-file';
import { Component, OnInit } from '@angular/core';
import { ProjectProposition } from '../models/project-proposition.model';
import { ProjectService } from '../services/project.service';
import { UIService } from '../services/ui.service';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-add-client-projects',
  templateUrl: './add-client-projects.page.html',
  styleUrls: ['./add-client-projects.page.scss'],
})
export class AddClientProjectsPage implements OnInit {
  addForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    file_spec: ['', Validators.required],
  });

  listDevTeam = [];

  uploadFile;

  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public authService: AuthService,
    private uiService: UIService,
    private projectService: ProjectService,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }

  pickFile() {
    this.fileChooser.open({ mime: 'application/pdf' })
      .then(uri => {
        console.log(uri);
        this.filePath.resolveNativePath(uri)
          .then(filePath => {
            console.log(filePath);
            const split = filePath.split('/');
            const pickedFile = split[split.length - 1];
            const pickedDir = filePath.substring(0, filePath.indexOf(pickedFile) - 1);
            console.log('Picked File', pickedFile);
            console.log('Picked Dir', pickedDir);
            this.file.readAsDataURL(pickedDir, pickedFile)
              .then(dataUrl => {
                console.log('Data Url BASE64, ', dataUrl);
                this.addForm.get('file_spec').setValue(pickedFile);
                this.uploadFile = convertBase64ToFile(dataUrl);
                console.log('The Upload FIle', this.uploadFile);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => console.log(err));
      })
      .catch(e => console.log(e));
  }


  saveProject() {
    this.uiService.startLoading();
    const project = {} as ProjectProposition;
    project.title = this.addForm.get('title').value;
    project.description = this.addForm.get('description').value;
    project.client = this.currentUser._id;
    project.cahier_charge = this.uploadFile;
    this.projectService.addProjectProposition(project)
      .subscribe(data => {
        console.log(data);
        this.uiService.stopLoading();
      }, err => {
        console.log(err);
        this.uiService.stopLoading();
      });
  }

}
