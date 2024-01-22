import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent {
  leads: any = [];

  plans: any = []
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.getPlans()
    console.log(this.isUserLogin())
  }

  isUserLogin() {
    if (localStorage.getItem('isUserLogin') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  getPlans() {
    this.global.get(this.global.basepath + '/getPlan').subscribe((res: any) => {
      this.plans = res.data;
    })
  }

  // store user id and plan id in lead database and redirect user to premium member page
  addLeads(id: any) {
    this.global.post(this.global.basepath + '/addLeads', { user_id: localStorage.getItem('user_id'), plan_id: id }).subscribe((res: any) => {
      this.leads = res?.data;
      localStorage.setItem('plan_id', id);
      setTimeout(() => {
        this.router.navigate(['/membership-page']);
      }, 500);
    })
  }

  showMessage() {
    this.messageService.clear()
    this.messageService.add({ severity: 'warn', summary: 'Please Login First In Order To Access Membership Plans' });
  }
}
