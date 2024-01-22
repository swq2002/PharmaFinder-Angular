import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { HomeComponent } from 'src/app/home/home.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/home.service';
@Component({
  selector: 'app-manage-home-page',
  templateUrl: './manage-home-page.component.html',
  styleUrls: ['./manage-home-page.component.css']
})
export class ManageHomePageComponent implements OnInit{
  constructor(public admin:AdminServicesService,public dialog: MatDialog,public home:HomeService){}
  @ViewChild('callUpdateDailog') callUpdateDailog!: TemplateRef<any>
  homedata:any;
  ngOnInit(): void {
    this.home.GetHome().subscribe(
      (data) => {
        this.homedata = data;
      },
      (err) => {
        console.error(err); 
      }
    ); 
  }
updateForm : FormGroup = new FormGroup({
  homeid:new FormControl(),
  heading1: new FormControl(''),
  content1 :new FormControl(''),
  image1 :new FormControl('')
})

previousData:any={} ;

 openUpdateDailog(home:any){
 this.previousData={
  homeid:home.homeid, 
  heading1:home.heading1, 
  content1:home.content1,
  image1:home.image1 }
  console.log(this.previousData);
 this.updateForm.controls['homeid'].setValue(this.previousData.homeid);
 this.admin.ihome=this.previousData.image1;
 this.dialog.open(this.callUpdateDailog);
 }

 updateHome(){
  this.admin.updateHome(this.updateForm.value)
 }

 UploadImage(file:any) {
  if(file.length==0)
   return ; 
   let fileToUpload=<File>file[0];
   const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.admin.uploadImageAttachment(formDate);
}

  
}