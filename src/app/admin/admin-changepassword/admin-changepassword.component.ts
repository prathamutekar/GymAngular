import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-changepassword',
  templateUrl: './admin-changepassword.component.html',
  styleUrls: ['./admin-changepassword.component.css'],
  providers: [MessageService]
})
export class AdminChangepasswordComponent {
  password = 'password';
  newpassword = 'password';
  cnfpassword = 'password';

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.patchvalue()
  }

  adminChangePassword = this.fb.group({
    email: ["", [Validators.required]],
    current_password: ["", [Validators.required]],
    new_password: ["", [Validators.required]],
    new_password_confirmation: ["", Validators.required],
  })

  changePassword() {
    this.global.post(this.global.basepath + '/adminChangePassword', this.adminChangePassword.value).subscribe((res: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: res.message });
      this.adminChangePassword.reset()
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }

  patchvalue() {
    this.adminChangePassword.controls['email'].setValue(localStorage.getItem('admin_email'))
  }
}
