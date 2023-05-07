import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user.model';
import { PostService } from '../services/post.service';
import { Post } from 'src/models/post.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostEditComponent } from './post-edit/post-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {

  createPost = new FormGroup({
    title: new FormControl(''),
    des: new FormControl(''),
    
  })

  user!: User;
  myposts!: Post[]
  constructor(
    private userService:UserService,
    private postService:PostService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();


    this.getMyPosts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMyPosts();
    this.getUser();
  }
  getUser(){
    this.userService.getUserByUsername(localStorage.getItem('user') as string).subscribe((users:any) => {
      console.log(users)
      this.user = users;
    })
  }
  getMyPosts(){
    this.postService.getAllPosts().subscribe(posts => {
      this.myposts = posts;
      this.myposts = this.myposts.filter(x => {return x.username == localStorage.getItem('user') as string})
    })
  }


  createMyPost(){
    
    this.postService.createPost(
      {
      id:this.user.username+Math.floor(Math.random() * 100),
      username:this.user.username,
      description:this.createPost.value.des,
      title:this.createPost.value.title,
      created:new Date()
      } as Post).subscribe(x => {this.getMyPosts()})
  }

  deletePost(delPost: Post){
    this.postService.deletePost((delPost as any)._id).subscribe(x => this.getMyPosts())
    console.log(delPost)
    
  }

  openDialog(post:Post): void {
    this.dialog.open(PostEditComponent, {
      width: '250px',
      data:post
    });
  }
}
