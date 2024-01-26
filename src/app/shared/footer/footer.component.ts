import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [MessageService]
})
export class FooterComponent {
  constructor(private router: Router, public global: GlobalService, private messageService: MessageService) { }

  ngOnInIt() {

  }

  navigateTo(val: any) {
    this.router.navigate([val]);
    this.global.actTab = val;
    sessionStorage.setItem('userActiveTab', val)
  }
}
