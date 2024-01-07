import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminpharmacyRoutingModule } from './adminpharmacy-routing.module';
import { SidbaradnminComponent } from './sidbaradnmin/sidbaradnmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { FiltarByMedcineNamePipe } from '../pipes/filtar-by-medcine-name.pipe';

@NgModule({
  declarations: [
    SidbaradnminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminpharmacyRoutingModule,
  ]
})
export class AdminpharmacyModule { }
