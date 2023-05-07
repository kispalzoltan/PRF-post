import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { PostEditComponent } from './profile/post-edit/post-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [ 
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'posts', component: ViewPostsComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewPostsComponent,
    RegistrationComponent,
    AdminComponent,
    ProfileComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
