import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminContactsComponent } from './admin-contacts/admin-contacts.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminLeadsComponent } from './admin-leads/admin-leads.component';
import { AdminGalleryComponent } from './admin-gallery/admin-gallery.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'primeng/api';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppComponent } from '../app.component';
import { AdminTrainersComponent } from './admin-trainers/admin-trainers.component';
import { AdminChangepasswordComponent } from './admin-changepassword/admin-changepassword.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminContactsComponent,
    AdminPlansComponent,
    AdminLeadsComponent,
    AdminGalleryComponent,
    AdminLoginComponent,
    AdminTrainersComponent,
    AdminChangepasswordComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    PaginatorModule,
    SharedModule,
    // AdminRoutingModule
  ],
  exports: [
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminContactsComponent,
    AdminPlansComponent,
    AdminLeadsComponent,
    AdminGalleryComponent,
    AdminTrainersComponent,
    AdminLoginComponent,
    AdminChangepasswordComponent
  ]
})
export class AdminModule { }
