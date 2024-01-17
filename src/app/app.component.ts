import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GymAngular';
  constructor(private router: Router, public global: GlobalService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to the top on route change
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
      if (window.scrollY > 200) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onUserLoginPage() {
    if (this.router.url.includes('/login')) {
      return true;
    }
    else {
      return false;
    }
  }

  onUserRegisterPage() {
    if (this.router.url.includes('/register')) {
      return true;
    }
    else {
      return false;
    }
  }

  onAdminPage() {
    if (this.router.url.includes('/admin')) {
      return true;
    }
    else {
      return false;
    }
  }

  onAdminLogin() {
    if (this.router.url.includes('admin/admin-login')) {
      return true;
    }
    else {
      return false;
    }
  }
}
