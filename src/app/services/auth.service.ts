import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    saveToken(token) {
        localStorage.setItem('token', token);
    }

    saveUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    isTokenValid(): boolean {
        return this.getToken() != null;
    }


}