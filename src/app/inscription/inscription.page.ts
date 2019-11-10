import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  user ={} as User ;
  constructor(private _userService : UserService ) { }

  add() {
  console.log(this.user);
  this._userService.addUser(this.user).subscribe(data =>{
        console.log(data);
  },err=>{
    console.log('error')
  })
  }
  ngOnInit() {
  }

}
