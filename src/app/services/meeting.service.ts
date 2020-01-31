import { GET_MEETINGS_MANAGER } from './../utils/API_URLS';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { ADD_MEETING, GET_ALL_MEETINGS_BY_DEV_ID, GET_ALL_MEETINGS, SEE_MEETING } from '../utils/API_URLS';

@Injectable({
    providedIn: 'root'
})
export class MeetingService {

    constructor(private http: HttpClient) {

    }

    addMeeting(meeting): Observable<Response> {
        const URL = ADD_MEETING;
        return this.http.post(URL, meeting);
    }

    getDevMeetings(id): Observable<Response> {
        const URL = GET_ALL_MEETINGS_BY_DEV_ID + id;
        return this.http.get(URL);
    }

    getAllMeetings(): Observable<Response> {
        const URL = GET_ALL_MEETINGS;
        return this.http.get(URL);
    }

    seeMeeting(id): Observable<Response> {
        const URL = SEE_MEETING + id;
        return this.http.get(URL);
    }

    getManagerProjects(id: string): Observable<Response> {
        const URL = GET_MEETINGS_MANAGER + id;
        return this.http.get(URL);
    }

}
