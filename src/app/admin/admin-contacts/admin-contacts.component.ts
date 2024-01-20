import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css'],
  providers: [MessageService]
})
export class AdminContactsComponent {
  contacts: any = [];
  contact_id: any;
  constructor(private global: GlobalService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getContact()
  }

  getContact() {
    this.global.get(this.global.basepath + '/getContact').subscribe((res: any) => {
      this.contacts = res.data;
    })
  }

  deleteContact() {
    this.global.post(this.global.basepath + '/deleteContact', { id: this.contact_id }).subscribe(
      (res: any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: res.message })
        this.getContact();
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    );
  }


}
