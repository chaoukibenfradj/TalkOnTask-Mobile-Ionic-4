import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-details',
  templateUrl: './profil-details.page.html',
  styleUrls: ['./profil-details.page.scss'],
})
export class ProfilDetailsPage implements OnInit {

  currentUser: User;
  isUpdating = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }

  gotoProfilUpd(id) {
    console.log('heyyyyyyyyy');
    this.router.navigate(['/profil-update/' + id]);
  }

  // updateToggle() {
  //   this.isUpdating = !this.isUpdating;
  // }


}
