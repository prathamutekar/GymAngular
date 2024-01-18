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
  TotalRecords: any = 0

  userlist: any;
  delete_ID: any
  constructor(private global: GlobalService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.global.get(this.global.basepath + '/getUsers').subscribe((res: any) => {
      this.userlist = res.data;
      this.TotalRecords = res.TotalRecords;
    })
  }

}
