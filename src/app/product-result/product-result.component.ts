import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.css']
})
export class ProductResultComponent {
  medicines: any;
  @ViewChild('callItemDailog') callItemDailog!: TemplateRef<any>

  constructor(private route: ActivatedRoute ,public dialog:MatDialog) {
    this.route.queryParams.subscribe(params => {
      if (params['medicines']) {
        this.medicines = JSON.parse(params['medicines']);
      }
    });
  }
  ItemDialog(medicinee:any){
    this.dialog.open(this.callItemDailog, {
      data: { medicine: medicinee }});



  }
  AddToCart(medicinee: any) {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
    const existingMedicineIndex = cart.findIndex(
      (item: any) => item.medicineid === medicinee.medicineid
    );
  
    if (existingMedicineIndex !== -1) {
      cart[existingMedicineIndex].quantity += 1; 
    } else {
      cart.push({ ...medicinee, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
