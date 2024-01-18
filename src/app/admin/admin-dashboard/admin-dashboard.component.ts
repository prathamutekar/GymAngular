import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [MessageService]
})
export class AdminDashboardComponent {
  users: any = 0;
  contacts: any = 0;
  trainers: any = 0;
  plans: any = 0;
  leads: any = 0;
  gallery: any = 0;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.getAdminDashboardCounts()
  }

  getAdminDashboardCounts() {
    this.global.get(this.global.basepath + '/getAdminDashboardCount').subscribe((res: any) => {
      this.users = res.users
      this.contacts = res.contacts
      this.trainers = res.trainers
      this.plans = res.plans
      this.leads = res.leads
      this.gallery = res.gallery
    })
  }

}
