import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../../Shared-components/navbar/navbar.module';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      pathMatch: 'full',
  }
];
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NavbarModule
  ]
})
export class HomeModule { }
