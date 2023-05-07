import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { AuthService } from './services/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PRF-beadando';

  constructor(private authService:AuthService, private router:Router){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login') 
   }
}
