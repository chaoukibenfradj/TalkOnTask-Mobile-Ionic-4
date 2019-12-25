import {
    GET_ALL_TASK_BY_PROJECT_ID,
    GET_ALL_TASK_BY_ID, UPDATE_TASK_STATE,
    DELETE_TASK, UPDATE_TASK, SAVE_TASK_REQUEST, GET_TASK_REQ_BY_DEV_ID, ACCPET_TASK_REQ, DELETE_TASK_REQ
} from './../utils/API_URLS';
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

    getTaskById(id): Observable<Response> {
        const URL = GET_ALL_TASK_BY_ID + id;
        return this.http.get(URL);
    }

    updateTaskState(id, newState) {
        const URL = UPDATE_TASK_STATE + id;
        // tslint:disable-next-line:object-literal-shorthand
        const body = { state: newState };
        return this.http.patch(URL, body);
    }

    deleteTask(id): Observable<Response> {
        const URL = DELETE_TASK + id;
        return this.http.delete(URL);
    }

    updateTask(id, newTask): Observable<Response> {
        const URL = UPDATE_TASK + id;
        const body = {
            // tslint:disable-next-line:object-literal-shorthand
            newTask: newTask
        };
        return this.http.patch(URL, body);
    }

    saveTaskRequest(taskReq): Observable<Response> {
        const URL = SAVE_TASK_REQUEST;
        return this.http.post(URL, taskReq);
    }

    getTaskReqByDevId(id): Observable<Response> {
        const URL = GET_TASK_REQ_BY_DEV_ID + id;
        return this.http.get(URL);
    }

    acceptTaskReq(id): Observable<Response> {
        const URL = ACCPET_TASK_REQ + id;
        return this.http.patch(URL, {});
    }

    deleteTaskReq(id): Observable<Response> {
        const URL = DELETE_TASK_REQ + id;
        return this.http.delete(URL);
    }

}
