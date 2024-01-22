import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css'],
  providers: [MessageService]
})
export class OurTeamComponent {

  trainers: any = []
  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  ngOnInit() {
    this.getTrainers()
    
  }

  getTrainers() {
    this.global.get(this.global.basepath + '/getTrainer').subscribe((res: any) => {
      this.trainers = res.data;
    })
  }
}
