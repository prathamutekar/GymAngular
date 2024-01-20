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
  trainers: any = [];
  trainer_id: any;

  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']

  iconFile: any = ""
  @ViewChild('image') iconInputVariable!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  AddTrainer = this.fb.group({
    name: ["", Validators.required],
    trainer_description: ["", Validators.required],
    age: ["", Validators.required],
    height: ["", Validators.required],
    weight: ["", Validators.required]
  })

  UpdateTrainer = this.fb.group({
    id: ["", Validators.required],
    name: ["", Validators.required],
    trainer_description: ["", Validators.required],
    age: ["", Validators.required],
    height: ["", Validators.required],
    weight: ["", Validators.required]
  })

  ngOnInit() {
    this.getTrainers()
    
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

  getTrainers() {
    this.global.get(this.global.basepath + '/getTrainer').subscribe((res: any) => {
      this.trainers = res.data;
    })
  }

  addBlogs() {
    const formData = new FormData();
    formData.append('image', this.iconFile);
    formData.append('name', this.AddTrainer.controls['name'].value!);
    formData.append('age', this.AddTrainer.controls['age'].value!);
    formData.append('height', this.AddTrainer.controls['height'].value!);
    formData.append('weight', this.AddTrainer.controls['weight'].value!);
    formData.append('trainer_description', this.AddTrainer.controls['trainer_description'].value!);


    this.global.post(this.global.basepath + '/addTrainer', formData).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message });
        this.AddTrainer.reset();
        this.getTrainers();
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
    formData.append('id', this.UpdateTrainer.controls['id'].value!);
    formData.append('name', this.UpdateTrainer.controls['name'].value!);
    formData.append('age', this.UpdateTrainer.controls['age'].value!);
    formData.append('height', this.UpdateTrainer.controls['height'].value!);
    formData.append('weight', this.UpdateTrainer.controls['weight'].value!);
    formData.append('trainer_description', this.UpdateTrainer.controls['trainer_description'].value!);

    this.global.post(this.global.basepath + '/updateTrainer', formData).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.UpdateTrainer.reset();
        this.getTrainers();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  deleteBlog() {
    this.global.post(this.global.basepath + '/deleteTrainer', { id: this.trainer_id }).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.getTrainers();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  patchvalue(val: any) {
    this.UpdateTrainer.patchValue(val)
  }

}
