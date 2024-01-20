import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-leads',
  templateUrl: './admin-leads.component.html',
  styleUrls: ['./admin-leads.component.css'],
  providers: [MessageService]
})
export class AdminLeadsComponent {
  Leads: any = [];

  constructor(private fb: FormBuilder, public global: GlobalService, public messageService: MessageService) { }

  ngOnInit() {
    this.getLeads()
  }

  //get all leads 
  getLeads() {
    this.global.get(this.global.basepath + '/getLeads').subscribe((res: any) => {
      this.Leads = res?.data
    })
  }

  // delete lead status based on lead id
  updateLeadStatus(val: any) {
    this.global.post(this.global.basepath + '/updateLeadStatus', { user_id: val?.id, leadStatus: val.leadStatus }).subscribe((res: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: res.message })
    }, (err: any) => {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: err.error.message });
    })
  }
}
