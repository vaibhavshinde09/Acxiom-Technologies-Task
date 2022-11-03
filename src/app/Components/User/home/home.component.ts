import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/Services/common.service';
declare var $:any;
import * as XLSX from 'xlsx';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('MAIN', { static: false }) MAIN!: ElementRef;  
Adduser:FormGroup;
getuserData:any=[];
imageURL:any='';
filepath:any;
ImageFormatFlag:boolean=true;
  constructor(private fb: FormBuilder,private commonservice:CommonService,private sanitizer:DomSanitizer) {
  this.Adduser=this.fb.group({
    name: ['', [Validators.required]],
    mobileno:['', [Validators.required]],
    address:['', [Validators.required]],
    skills:['', [Validators.required]],
    hobbies:['', [Validators.required]],
    photo:['', [Validators.required]],
  });
  }
  get f() { return this.Adduser.controls;}
  ngOnInit(): void {
    this.getUserDataApi();
    this.commonservice.currentUserLogin.subscribe((res:any)=>{
    })
  }
  showPreview(event:any)
  {    // File Preview
    let fileList: FileList = event.target.files;
    let file = fileList[0];
    this.filepath= event.target.files[0];
    if(this.filepath==undefined){
    }
    else{
    if(this.filepath.type !== "image/png" && this.filepath.type !== "image/jpg" && this.filepath.type !== "image/jpeg" && this.filepath.type !== "application/pdf")
    {
    this.ImageFormatFlag=false;
    }
    else
    {
      this.ImageFormatFlag=true;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
    }   
  }
  OnSubmit()
  {
   let datas:any=[];
   datas=this.Adduser.value;
   datas.photo=this.imageURL;
   this.commonservice.AddUserData(datas);
   alert("User Data Added Sucessfully");
   this.Adduser.reset();
   this.imageURL='';
   $("#UserModel").modal('hide');
  }
  getUserDataApi()
  {
    this.commonservice.currentUserObj.subscribe((resp:any)=>{
     if(resp==null)
     {
      this.getuserData=[];
     }
     else{
      if(isJson(resp)==false)
      {
        this.getuserData.push(resp)
      }
      else
      {
        this.getuserData.push(JSON.parse(resp));
      }
     }
    });
  }
  DownloadReport()
  {
    if(this.getuserData.length==0)
    {
      alert("Record Not Found")
    }
    else
    {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.MAIN.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, 'Report.xlsx'); 
    }
  }
  getSafeUrl(fileName:any)
  {
      return this.sanitizer.bypassSecurityTrustResourceUrl(fileName);
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
