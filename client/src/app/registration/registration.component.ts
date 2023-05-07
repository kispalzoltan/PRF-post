import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');
  birthDate = new FormControl('');

  constructor(private router : Router, private authenticationService: AuthService) { }

  ngOnInit(): void {
  }

  registration() {
    console.log(this.username.value!, this.password.value!, this.birthDate.value!)
    this.authenticationService.register(this.username.value!, this.password.value!, this.birthDate.value!);
    this.router.navigateByUrl('/posts');
  }

}