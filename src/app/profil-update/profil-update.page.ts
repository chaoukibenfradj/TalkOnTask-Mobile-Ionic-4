import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil-update',
  templateUrl: './profil-update.page.html',
  styleUrls: ['./profil-update.page.scss'],
})
export class ProfilUpdatePage implements OnInit {

  currentUser: User;
  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }

}
