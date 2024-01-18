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
  category: any = 0;
  subcategory: any = 0;
  services: any = 0;
  blogs: any = 0;
  addons: any = 0;
  coupons: any = 0;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.getAdminDashboardCounts()
  }

  getAdminDashboardCounts() {
    this.global.get(this.global.basepath + '/getAdminDashboardCount').subscribe((res: any) => {
      this.users = res.user
      this.contacts = res.contacts
      this.category = res.category
      this.subcategory = res.subcategory
      this.services = res.services
      this.blogs = res.blogs
      this.addons = res.addons
      this.coupons = res.coupons
    })
  }

}
