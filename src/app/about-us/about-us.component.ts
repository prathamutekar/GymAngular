import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers: [MessageService]
})
export class AboutUsComponent {

  constructor(private router: Router, public global: GlobalService, private messageService: MessageService) { }

  ngOnInIt(){

  }

  navigateTo(val: any) {
    this.router.navigate([val]);
    this.global.actTab = val;
    sessionStorage.setItem('userActiveTab', val)
  }
}
