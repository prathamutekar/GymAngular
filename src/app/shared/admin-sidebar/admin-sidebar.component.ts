import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  providers: [MessageService]
})
export class AdminSidebarComponent {

  constructor(private router: Router, public global: GlobalService, private messageService: MessageService) { }

  navigateTo(val: any) {
    this.router.navigate(['/admin/' + val]);
    this.global.activeTab = val;
    sessionStorage.setItem('adminActiveTab', val)
  }

  logout() {
    localStorage.clear()
    sessionStorage.clear()
    this.messageService.clear()
    this.messageService.add({ severity: 'success', summary: "Logged Out Successfully!" });
    setTimeout(() => {
      this.router.navigate(['/admin/admin-login'])
    }, 500);
  }

}
