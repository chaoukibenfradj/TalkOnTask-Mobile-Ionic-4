
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): boolean {
        if (!this.auth.isTokenValid()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}