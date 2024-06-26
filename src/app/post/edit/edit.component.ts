import { Component } from '@angular/core';
import { Post } from '../post';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id!:number;
  post!:Post;
  form!:FormGroup;
  constructor(public postService:PostService, private router:Router, private route: ActivatedRoute){}
  ngOnInit():void{
    this.id= this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data:Post)=>{
      this.post = data
    });
    this.form = new FormGroup({
      title: new FormControl('',[Validators.required]),
      body: new FormControl('',[Validators.required])
    });
  }
  get f(){
    return this.form.controls;
  }
  submit_edit(){
    console.log(this.form.value)
    this.postService.update_post(this.id,this.form.value).subscribe((res:any)=>{
      alert("Update successful");
      this.router.navigateByUrl('post/index')
    })
  }



  
}
