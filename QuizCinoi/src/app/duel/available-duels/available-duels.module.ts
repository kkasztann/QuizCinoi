import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvailableDuelsPage } from './available-duels.page';

const routes: Routes = [
  {
    path: '',
    component: AvailableDuelsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvailableDuelsPage]
})
export class AvailableDuelsPageModule {}
