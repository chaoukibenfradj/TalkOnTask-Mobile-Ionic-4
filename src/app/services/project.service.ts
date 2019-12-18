import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_MANAGER_PROJECTS, ADD_PROJECT } from '../utils/API_URLS';
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

}
