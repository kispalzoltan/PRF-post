import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');

  constructor(private router : Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login() {
    await this.authService.login(this.username.value!, this.password.value!);
    this.router.navigateByUrl('/posts');
  }

}