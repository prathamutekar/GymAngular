import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.css'],
  providers: [MessageService]
})
export class AdminPlansComponent {
  plans: any = [];
  plan_id: any;

  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']

  iconFile: any = ""
  @ViewChild('image') iconInputVariable!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  AddPlan = this.fb.group({
    plan_name: ["", Validators.required],
    price: ["", Validators.required],
    plan_validity: ["", Validators.required],
    plan_features: ["", Validators.required],
   })

  UpdatePlan = this.fb.group({
    id: ["", Validators.required],
    plan_name: ["", Validators.required],
    price: ["", Validators.required],
    plan_validity: ["", Validators.required],
    plan_features: ["", Validators.required],
  })

  ngOnInit() {
    this.getPlans()
    
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

  getPlans() {
    this.global.get(this.global.basepath + '/getPlan').subscribe((res: any) => {
      this.plans = res.data;
    })
  }

  addPlans() {
    this.global.post(this.global.basepath + '/addPlan', this.AddPlan.value).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message });
        this.AddPlan.reset();
        this.getPlans();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  UpdatePlans() {
    this.global.post(this.global.basepath + '/updatePlan', this.UpdatePlan.value).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.UpdatePlan.reset();
        this.getPlans();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  deletePlans() {
    this.global.post(this.global.basepath + '/deletePlan', { id: this.plan_id }).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.getPlans();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }

  patchvalue(val: any) {
    this.UpdatePlan.patchValue(val)
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Use a regular expression to keep only alphabets, spaces, and backspace
    const sanitizedValue = inputValue.replace(/[^a-zA-Z\s\b]/g, '');

    if (inputValue !== sanitizedValue) {
      // If the input value was modified, update the input value
      input.value = sanitizedValue;
    }
  }

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Use a regular expression to keep only numeric characters, spaces, and backspace
    const sanitizedValue = inputValue.replace(/[^0-9\s\b]/g, '');

    if (inputValue !== sanitizedValue) {
      // If the input value was modified, update the input value
      input.value = sanitizedValue;
    }
  }


}
