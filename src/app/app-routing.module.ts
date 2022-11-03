import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./Components/Authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path:'User/home',
    loadChildren: () => import('./Components/User/home/home.module').then(m => m.HomeModule),
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // 
  { path: '**',   redirectTo: '/login', pathMatch: 'full' }, //
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
