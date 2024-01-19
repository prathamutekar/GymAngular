import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminContactsComponent } from './admin-contacts/admin-contacts.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminLeadsComponent } from './admin-leads/admin-leads.component';
import { AdminGalleryComponent } from './admin-gallery/admin-gallery.component';
import { AdminTrainersComponent } from './admin-trainers/admin-trainers.component';
import { AdminChangepasswordComponent } from './admin-changepassword/admin-changepassword.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin-login' },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-contacts', component: AdminContactsComponent },
  { path: 'admin-plans', component: AdminPlansComponent },
  { path: 'admin-leads', component: AdminLeadsComponent },
  { path: 'admin-gallery', component: AdminGalleryComponent },
  { path: 'admin-trainers', component: AdminTrainersComponent },
  { path: 'admin-changepassword', component: AdminChangepasswordComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
