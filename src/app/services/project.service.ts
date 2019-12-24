
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_MANAGER_PROJECTS, ADD_PROJECT, GET_ALL_PROJECTS, SEE_PROJECT, GET_ALL_PROJECTS_BY_DEV_ID } from '../utils/API_URLS';
import { Response } from '../models/response.model';

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

}
