import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  providers: [MessageService]

})
export class ChangepasswordComponent {
  password = 'password';
  newpassword = 'password';
  cnfpassword = 'password';

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.patchvalue()
  }

  ChangePassword = this.fb.group({
    email: ["", [Validators.required]],
    current_password: ["", [Validators.required]],
    new_password: ["", [Validators.required]],
    new_password_confirmation: ["", Validators.required],
  })

  changePassword() {
    this.global.post(this.global.basepath + '/userChangePassword', this.ChangePassword.value).subscribe((res: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: res.message });
      this.ChangePassword.reset()
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.message });
      this.ChangePassword.reset()

    })
  }

  patchvalue() {
    this.ChangePassword.controls['email'].setValue(localStorage.getItem('user_email'))
  }

}
