import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent {
  username = localStorage.getItem('username');
  constructor(private router: Router, public global: GlobalService, private messageService: MessageService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    console.log(this.username);
  }

  navigateTo(val: any) {
    this.router.navigate([val]);
    this.global.actTab = val;
    sessionStorage.setItem('userActiveTab', val)
  }

  isUserLogin() {
    if (localStorage.getItem('isUserLogin') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Logged Out Successfully!' });
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  truncateText(text: string): string {
    const limit = 6;
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + '..';
    }
  }

  togglemenufun() {
    // Canvas Menu
    document.querySelector('.canvas-open')?.addEventListener('click', () => {
      const offcanvasMenuWrapper = document.querySelector('.offcanvas-menu-wrapper');
      const offcanvasMenuOverlay = document.querySelector('.offcanvas-menu-overlay');

      offcanvasMenuWrapper?.classList.add('show-offcanvas-menu-wrapper');
      offcanvasMenuOverlay?.classList.add('active');
    });

    const closeElements = document.querySelectorAll('.canvas-close, .offcanvas-menu-overlay');
    closeElements.forEach((element) => {
      element.addEventListener('click', () => {
        const offcanvasMenuWrapper = document.querySelector('.offcanvas-menu-wrapper');
        const offcanvasMenuOverlay = document.querySelector('.offcanvas-menu-overlay');

        offcanvasMenuWrapper?.classList.remove('show-offcanvas-menu-wrapper');
        offcanvasMenuOverlay?.classList.remove('active');
      });
    });
  }


}
