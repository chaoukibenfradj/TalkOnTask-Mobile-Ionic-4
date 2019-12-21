import { GET_MESSAGES, GET_LAST_MESSAGES } from './../utils/API_URLS';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Response } from '../models/response.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private socket: Socket, private http: HttpClient) {

    }

    sendMessage(message) {
        this.socket.emit('send-message', message) ;
    }

    getMessages(fromId, toId): Observable<Response> {
        const URL = GET_MESSAGES + `${fromId}/${toId}`;
        return this.http.get(URL);
    }

    getLastMessages(id): Observable<Response> {
      const URL = GET_LAST_MESSAGES + id;
      return this.http.get(URL) ;
    }

}
