import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/Services/admin-services.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-about-page',
  templateUrl: './manage-about-page.component.html',
  styleUrls: ['./manage-about-page.component.css']
})
export class ManageAboutPageComponent {
  constructor(public admin:AdminServicesService,public dialog: MatDialog,public home:HomeService){}
  @ViewChild('callAboutUpdateDailog') callAboutUpdateDailog!: TemplateRef<any>
  aboutdata:any;
  ngOnInit(): void {
    this.home.GetAbout().subscribe(
      (data) => {
        this.aboutdata = data;
      },
      (err) => {
        console.error(err); 
      }
    );
  }
  updateForm : FormGroup= new FormGroup({
    aboutid:new FormControl(1),
    heading1 :new FormControl(''), 
    content1 :new FormControl(), 
    image1 :new FormControl(''),
    })

previousData:any={} ;

 openUpdateDailog(about:any){
 this.previousData={
  aboutid:about.aboutid, 
  heading1:about.heading1, 
  content1:about.content1,
  image1:about.image1 }
  console.log(this.previousData);
 this.updateForm.controls['aboutid'].setValue(this.previousData.aboutid);
 this.admin.iabout=this.previousData.image1;
 this.dialog.open(this.callAboutUpdateDailog);
 }

 updateAbout() {
  this.admin.updateAbout(this.updateForm.value);
 }
 UploadImage(file:any) {
  if(file.length==0)
   return ; 
   let fileToUpload=<File>file[0];
   const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.admin.uploadImageAboutAttachment(formDate);
}
}