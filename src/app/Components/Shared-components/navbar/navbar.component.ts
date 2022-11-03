import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Username:any;
  LoginDetails:any={};
  constructor(private router:Router,private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.currentUserLogin.subscribe((res:any)=>{
      if(res==null)
      {
        this.router.navigate(['/login']);
      }
      else
      {
        if(isJson(res)==false)
        {
          this.LoginDetails=res;
        }
        else
        {
          this.LoginDetails=JSON.parse(res);
        }
        this.Username=this.LoginDetails.username;
      }
    })
  }
  logout()
  {
    this.commonService.logout();
  }
}
function isJson(str:any) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return isNaN(str);
}
