import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-create',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(public postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res: any) => {
      alert("Create successful");
      this.router.navigateByUrl('post/index');
    })
  }
}