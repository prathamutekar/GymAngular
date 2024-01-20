import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  password = 'password';
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  userregistration = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
    mobile_no: ["", [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$"), Validators.required]],
    password: ["", Validators.required],
    gender: ["", Validators.required],
    age: ["", Validators.required],
    address: ["", Validators.required],
  })

  userRegistration() {
    this.global.post(this.global.basepath + '/userRegistration', this.userregistration.value).subscribe((res: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: res.message });
      this.userregistration.reset()
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.message });
      this.userregistration.reset()
    })
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
