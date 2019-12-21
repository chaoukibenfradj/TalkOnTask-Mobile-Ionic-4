import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat-friends-list',
  templateUrl: './chat-friends-list.page.html',
  styleUrls: ['./chat-friends-list.page.scss'],
})
export class ChatFriendsListPage implements OnInit {

  listUsers: User[] = [];
  currentUser: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers()
      .subscribe(data => {
        this.listUsers = data.data;
        this.listUsers.splice(this.listUsers.findIndex((element) => element._id === this.currentUser._id), 1);
      }, err => {
        console.log(err);
      });
  }

  getMessages(id) {
    this.router.navigate(['/chat-list-messages/' + id]);
  }

}
