import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtarByPharmacyName'
})
export class FiltarByPharmacyNamePipe implements PipeTransform {

  transform(pharmacy:any[],pharmacyName:string ) {
    if(pharmacyName=='')
    {return pharmacy;}
    else {
     return pharmacy.filter((item)=>{
       return item.pharmacyname.toLowerCase().includes(pharmacyName.toLowerCase());
      })
    }
  }

}
