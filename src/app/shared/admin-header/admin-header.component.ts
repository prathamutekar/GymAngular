import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  providers: [MessageService]
})
export class AdminHeaderComponent {
  // notifications: any = [];
 
  constructor(private router: Router, private messageService: MessageService, public global: GlobalService) { }

  ngOnInit() {
    // this.getNotifications()
  }

  logout() {
    localStorage.clear()
    this.messageService.clear()
    this.messageService.add({ severity: 'success', summary: "Logged Out Successfully!" });
    setTimeout(() => {
      this.router.navigate(['/admin/admin-login'])
    }, 500);
  }

  // getNotifications() {
  //   this.global.post(this.global.basepath + '/getUnreadNotificationAccordingToUserTypes', { type: localStorage.getItem('type'), id: localStorage.getItem('id') }).subscribe((res: any) => {
  //     this.notifications = res.data
  //   })
  // }

  navigateTo(val: any) {
    this.router.navigate(['/admin/' + val]);
    this.global.activeTab = val;
    sessionStorage.setItem('adminActiveTab', val)
  }

  toggleMenu() {
    this.global.menu = !this.global.menu;
  }
}
