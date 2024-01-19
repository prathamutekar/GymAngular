import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-trainers',
  templateUrl: './admin-trainers.component.html',
  styleUrls: ['./admin-trainers.component.css'],
  providers: [MessageService]
})
export class AdminTrainersComponent {
  blogs: any = [];
  blog_id: any;
  TotalRecords: any = 0

  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']

  iconFile: any = ""
  @ViewChild('image') iconInputVariable!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  AddBlog = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
  })

  UpdateBlog = this.fb.group({
    id: ["", Validators.required],
    title: ["",],
    description: ["",]
  })

  ngOnInit() {
    this.getBlogs()
    
  }

  handleFileInput(event: any) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const fileExtension = file.name.split('.').pop()
      if (this.imageExtensionsArray.includes(fileExtension)) {
        this.iconFile = file
      } else {
        this.iconInputVariable.nativeElement.value = '';
      }
    }
  }

  getBlogs() {
    this.global.get(this.global.basepath + '/getTrainer').subscribe((res: any) => {
      this.blogs = res.data;
      this.TotalRecords = res.TotalRecords;
    })
  }

  addBlogs() {
    const formData = new FormData();
    formData.append('image', this.iconFile);
    formData.append('title', this.AddBlog.controls['title'].value!);
    formData.append('description', this.AddBlog.controls['description'].value!);

    this.global.post(this.global.basepath + '/addBlogs', formData).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message });
        this.AddBlog.reset();
        this.getBlogs();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  UpdateBlogs() {
    const formData = new FormData();
    formData.append('image', this.iconFile);
    formData.append('id', this.UpdateBlog.controls['id'].value!);
    formData.append('title', this.UpdateBlog.controls['title'].value!);
    formData.append('description', this.UpdateBlog.controls['description'].value!);

    this.global.post(this.global.basepath + '/updateBlogs', formData).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.UpdateBlog.reset();
        this.getBlogs();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  deleteBlog() {
    this.global.post(this.global.basepath + '/deleteBlog', { id: this.blog_id }).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.getBlogs();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  patchvalue(val: any) {
    this.UpdateBlog.patchValue(val)
  }

}
