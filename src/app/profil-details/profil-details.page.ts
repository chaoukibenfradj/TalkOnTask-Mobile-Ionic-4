import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil-details',
  templateUrl: './profil-details.page.html',
  styleUrls: ['./profil-details.page.scss'],
})
export class ProfilDetailsPage implements OnInit {

  currentUser: User;
  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }


}
