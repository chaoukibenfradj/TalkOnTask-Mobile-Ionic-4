import { GET_ALL_PROJECTS, GET_ALL_TASK_BY_PROJECT_ID } from './../utils/API_URLS';


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { ADD_TASK } from '../utils/API_URLS';


@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) {
    }

    addTask(task): Observable<Response> {
        const URL = ADD_TASK;
        return this.http.post(URL, task);
    }

    getAllTasksByProjectId(id): Observable<Response> {
        const URL = GET_ALL_TASK_BY_PROJECT_ID + id;
        return this.http.get(URL);
    }

}
