import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css'],
  providers: [MessageService]
})
export class AdminGalleryComponent {
  gallery: any = [];
  gallery_id: any;

  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']

  iconFile: any = ""
  @ViewChild('image') iconInputVariable!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  AddGallery = this.fb.group({
    videolink: [""],
  })

  UpdateGallery = this.fb.group({
    id: ["", Validators.required],
    videolink: [""],
  })

  ngOnInit() {
    this.getGallery()

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

  getGallery() {
    this.global.get(this.global.basepath + '/getGalleryImage').subscribe((res: any) => {
      this.gallery = res.data;
    })
  }

  addGalleryImage() {
    const formData = new FormData();
    formData.append('image', this.iconFile);
    formData.append('videolink', this.AddGallery.controls['videolink'].value!);

    this.global.post(this.global.basepath + '/addGalleryImage', formData).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message });
        this.AddGallery.reset();
        this.getGallery();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  UpdateGalleryImage() {
    const formData = new FormData();
    formData.append('image', this.iconFile);
    formData.append('id', this.UpdateGallery.controls['id'].value!);
    formData.append('videolink', this.UpdateGallery.controls['videolink'].value!);

    this.global.post(this.global.basepath + '/updateGalleryImage', formData).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.UpdateGallery.reset();
        this.getGallery();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  deleteGallery() {
    this.global.post(this.global.basepath + '/deleteGalleryImage', { id: this.gallery_id }).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.getGallery();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  patchvalue(val: any) {
    this.UpdateGallery.patchValue(val)
  }


}
