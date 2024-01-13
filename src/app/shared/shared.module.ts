import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminHeaderComponent,
    FooterComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ToastModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AdminHeaderComponent,
    AdminSidebarComponent
  ]
})
export class SharedModule { }
