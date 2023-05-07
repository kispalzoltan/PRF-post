import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService:UserService) { }

  users:User[] = [];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(x =>{
      this.users = x;
    })
  }

}
