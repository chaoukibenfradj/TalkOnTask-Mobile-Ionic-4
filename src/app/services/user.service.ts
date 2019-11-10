import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { SAVE_USER, GET_ALL_USERS } from './../utils/API_URLS';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http : HttpClient) { }

  addUser(user):Observable<any>{
    const URL=SAVE_USER;
    return this._http.post<User>(URL, user) ; 
  }

  getAllUsers():Observable<any>{
    const URL=GET_ALL_USERS;
    return this._http.get(URL);

  }
}
