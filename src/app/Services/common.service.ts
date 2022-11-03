import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // JSON.parse(credentials)
  currentUserLogin=new BehaviorSubject(localStorage.getItem('userData'));
  currentUserObj=new BehaviorSubject(localStorage.getItem('userAllData'));
  constructor(private route:Router) { }
  AddUserData(datas:any)
  {
    this.currentUserObj.next(datas);
    localStorage.setItem('userAllData', JSON.stringify(datas));
  }
  login(credentials:any)
  {
    this.currentUserLogin.next(credentials);
    localStorage.setItem('userData', JSON.stringify(credentials));
    alert("Login Sucessfully ..!");
    this.route.navigate(['User/home']);
  }
  logout()
  {
    localStorage.removeItem('userData');
    localStorage.removeItem('userAllData');
    this.currentUserLogin.next(null);
    this.currentUserObj.next(null);
    alert("Logout Sucessfully ..!");
    // this.route.navigate(['login']);
  }
}
