import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

const routes: Routes = [
  // { path: '', component: SharedComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'admin-header', component: AdminHeaderComponent },
  { path: 'admin-sidebar', component: AdminSidebarComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedRoutingModule { }
