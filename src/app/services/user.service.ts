import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import {
  SAVE_USER,
  GET_ALL_USERS, LOGIN_USER, GET_ALL_USER_BY_TYPE, GET_USER_BY_ID, GET_ALL_DEV_BY_PROJECT_ID, UPDATE_FCM_TOKEN
} from './../utils/API_URLS';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user): Observable<any> {
    const URL = SAVE_USER;
    return this.http.post<User>(URL, user);
  }

  getAllUsers(): Observable<any> {
    const URL = GET_ALL_USERS;
    return this.http.get(URL);
  }

  getUserById(id): Observable<Response> {
    const URL = GET_USER_BY_ID + id;
    return this.http.get(URL);
  }


  loginUser(email, password): Observable<Response> {
    const URL = LOGIN_USER;
    // tslint:disable-next-line:object-literal-shorthand
    const body = { email: email, password: password };
    return this.http.post<Response>(URL, body);
  }

  getAllUserByType(userType: string): Observable<Response> {
    const URL = GET_ALL_USER_BY_TYPE + userType;
    return this.http.get<Response>(URL);
  }

  getAllDevByProjectId(id): Observable<Response> {
    const URL = GET_ALL_DEV_BY_PROJECT_ID + id;
    return this.http.get(URL);
  }

  updateFCMToken(id, token): Observable<Response> {
    const URL = UPDATE_FCM_TOKEN + id;
    return this.http.patch(URL, { token });
  }


}
