import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent {
  password = 'password';
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  userlogin = this.fb.group({
    email: ["", [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
    password: ["", Validators.required],
  })

  userLogin() {
    this.global.post(this.global.basepath + '/userLogin', this.userlogin.value).subscribe((res: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: res.message });
      setTimeout(() => {
        localStorage.clear()
        localStorage.setItem('isUserLogin', 'true');
        localStorage.setItem('user_email', res.data.email);
        this.router.navigate(['/home']);
      }, 500);
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }

}
