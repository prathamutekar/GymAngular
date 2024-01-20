import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [MessageService]
})
export class AdminLoginComponent {
  password = 'password';
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  adminlogin = this.fb.group({
    email: ["", [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
    password: ["", Validators.required],
  })

  adminLogin() {
    this.global.post(this.global.basepath + '/adminLogin', this.adminlogin.value).subscribe((res: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: res.message });
      setTimeout(() => {
        localStorage.clear()
        localStorage.setItem('isAdminLogin', 'true');
        localStorage.setItem('admin_email', res.data.email);
        this.router.navigate(['/admin/admin-dashboard']);
      }, 500);
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }

}
