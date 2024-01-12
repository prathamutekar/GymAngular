import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BmiCalculatorComponent } from './bmi-calculator/bmi-calculator.component';
import { ClassesComponent } from './classes/classes.component';
import { GalleryComponent } from './gallery/gallery.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'bmi-calculator', component: BmiCalculatorComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'our-team', component: OurTeamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
