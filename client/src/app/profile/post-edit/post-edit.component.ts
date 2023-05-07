import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/models/post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  updatePost = new FormGroup({
    title: new FormControl(''),
    des: new FormControl(''),
    
  })

  temp!: Post;
  constructor(private postService:PostService,public dialogRef: MatDialogRef<PostEditComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: Post) { }

  ngOnInit(): void {
   this.temp = this.data;
   console.log((this.data as any)._id)
  }

  updateMyPost(){
   let id = (this.data as any)._id
   this.temp.title = this.updatePost.value.title;
   this.temp.description = this.updatePost.value.des
   console.log(id)
   console.log(this.temp)
   this.postService.updatePost(id,this.temp).subscribe(x => console.log(x))
   this.dialogRef.close()
  }

}
