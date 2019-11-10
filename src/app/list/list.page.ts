import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  listUsers : User[]=[];
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private _userService : UserService) {
    
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe(
      data=>{
        this.listUsers=data.data;
        console.log(data);
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  ngOnInit() {
    this.getAllUsers();

  }

}
