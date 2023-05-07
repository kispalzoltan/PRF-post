import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from 'src/models/post.model';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {

  posts:Post[]= [];

  constructor(private postService:PostService) { }


  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((posts: any) => {
      console.log(posts)
      this.posts = posts;
    })
  }

}
