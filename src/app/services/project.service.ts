
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    GET_MANAGER_PROJECTS, ADD_PROJECT,
    GET_ALL_PROJECTS, SEE_PROJECT,
    GET_ALL_PROJECTS_BY_DEV_ID,
    ADD_PROJECT_PROPOSITION,
    GET_PROJECT_PROPOSITION_BY_CLIENT_ID,
    GET_PROJECT_PROPOSITION_ID,
    PROJECT_STATS
} from '../utils/API_URLS';
import { Response } from '../models/response.model';
import { ProjectProposition } from '../models/project-proposition.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {

    }

    getManagerProjects(id: string): Observable<Response> {
        const URL = GET_MANAGER_PROJECTS + id;
        return this.http.get(URL);
    }


    addProject(project): Observable<Response> {
        const URL = ADD_PROJECT;
        return this.http.post(URL, project);
    }

    seeProject(id): Observable<Response> {
        const URL = SEE_PROJECT + id;
        return this.http.get(URL);
    }

    getAllProjects(): Observable<Response> {
        const URL = GET_ALL_PROJECTS;
        return this.http.get(URL);
    }

    getDevProjects(id): Observable<Response> {
        const URL = GET_ALL_PROJECTS_BY_DEV_ID + id;
        return this.http.get(URL);
    }

    addProjectProposition(project: ProjectProposition): Observable<Response> {
        const URL = ADD_PROJECT_PROPOSITION;
        console.log(project);
        const formData = new FormData();
        formData.append('file', project.cahier_charge.name[0]);
        formData.append('title', project.title);
        formData.append('description', project.description);
        formData.append('client', project.client);
        return this.http.post(URL, formData);
    }

    getClientPropositionsById(id): Observable<any> {
        return this.http.get(GET_PROJECT_PROPOSITION_BY_CLIENT_ID + id);
    }

    getPropositionsById(id): Observable<any> {
        return this.http.get(GET_PROJECT_PROPOSITION_ID + id);
    }

    getAllPropositions(): Observable<any> {
        return this.http.get(GET_PROJECT_PROPOSITION_ID);
    }

    getProjectStats(id): Observable<any> {
        return this.http.get(PROJECT_STATS + id) ;
    }

}
