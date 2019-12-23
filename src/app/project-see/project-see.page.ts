import { TaskService } from './../services/task.service';
import { ProjectService } from './../services/project.service';
import { Project } from './../models/project.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../models/task.model';
import { UIService } from '../services/ui.service';


@Component({
  selector: 'app-project-see',
  templateUrl: './project-see.page.html',
  styleUrls: ['./project-see.page.scss'],
})
export class ProjectSeePage implements OnInit {
  projectId: string;
  currentproject: Project;
  listTasks: Task[] = [];
  constructor(
    private uiService: UIService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.projectId = data.get('id');
      console.log('Params passed through routing=>', this.projectId);
      this.seeProject();
      this.getAllTasksByProjectId();
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
      }, err => {
        console.log(err);
      });
  }
}
