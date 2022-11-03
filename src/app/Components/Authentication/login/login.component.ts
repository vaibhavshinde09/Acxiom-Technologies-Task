import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  type:boolean=true;
  constructor(private fb: FormBuilder,private commonservice:CommonService) { 
  this.login=this.fb.group({
  username: ['', [Validators.required]],
  password:['', [Validators.required,Validators.minLength(6),Validators.maxLength(40)]],
  });
  }
  get f() { return this.login.controls;}
  ngOnInit(): void {
  }
  changepasstype()
  {
    this.type=!this.type;
  }
  doLogin()
  {
    let username=this.login.controls.username.value;
    let password=this.login.controls.password.value;
    let datas={};
    if(username==='Admin' && password==='Admin@123')
    {
      datas={
        username:this.login.controls.username.value,
        password:this.login.controls.password.value,
      }
      this.commonservice.login(datas);
    }
    else
    {
      console.log(datas);
      alert("Invalid credentials ..!");
      this.login.reset();
    }
    
  }
  Reset()
  {
    this.login.reset();
  }
}
