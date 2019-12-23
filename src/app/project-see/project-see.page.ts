import { ProjectService } from './../services/project.service';
import { Project } from './../models/project.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-see',
  templateUrl: './project-see.page.html',
  styleUrls: ['./project-see.page.scss'],
})
export class ProjectSeePage implements OnInit {
  projectId: string;
  currentproject: Project;
  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(data => {
      this.projectId = data.get('id');
      console.log('Params passed through routing=>', this.projectId);
      this.seeProject();
    });


  }

  seeProject() {
    this.projectService.seeProject(this.projectId)
      .subscribe(data => {
        this.currentproject = data.data;
      }, err => {
        console.log(err);
      });
  }


}
