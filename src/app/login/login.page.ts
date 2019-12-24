import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Response } from '../models/response.model';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _menuController: MenuController
  ) { }

  ngOnInit() {
    this._menuController.enable(false);
    if (this._authService.isTokenValid()) {
      this._router.navigate(['/home']);
      this._menuController.enable(true);
    }
  }

  showPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this._userService.loginUser(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    ).subscribe((data: Response) => {
      const decoded = jwt_decode(data.data);
      this._authService.saveToken(data.data);
      this._authService.saveUser(decoded.user);
      this._router.navigate(['/home']);
      this._menuController.enable(true);
    }, err => {
      this._menuController.enable(false);
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    });
  }

}
