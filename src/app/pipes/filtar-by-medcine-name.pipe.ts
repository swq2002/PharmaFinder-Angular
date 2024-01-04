import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtarByMedcineName'
})
export class FiltarByMedcineNamePipe implements PipeTransform {

  transform(medcine: any[],filterMedicineName:string) {
    if(filterMedicineName=='') {return medcine;}
    else  return medcine.filter((item)=>{
      debugger;
      console.log(item.medicinename.toLowerCase());
      console.log(filterMedicineName.toLowerCase());
      return item.medicinename.toLowerCase().includes(filterMedicineName.toLowerCase());
    })
  }

}
