import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-membership-page',
  templateUrl: './membership-page.component.html',
  styleUrls: ['./membership-page.component.css'],
  providers: [MessageService]
})
export class MembershipPageComponent {
  plans: any = [];
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.getMembershipPlanByPlanId()

  }

  isUserLogin() {
    if (localStorage.getItem('isUserLogin') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  getMembershipPlanByPlanId() {
    this.global.post(this.global.basepath + '/getMembershipPlanByPlanId', {
      plan_id: localStorage.getItem('plan_id')
    }).subscribe((res: any) => {
      this.plans = res?.plans;
      console.log(this.plans);

    })
  }
}
