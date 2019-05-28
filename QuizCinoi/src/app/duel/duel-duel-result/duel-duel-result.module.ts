import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DuelDuelResultPage } from './duel-duel-result.page';

const routes: Routes = [
  {
    path: '',
    component: DuelDuelResultPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DuelDuelResultPage]
})
export class DuelDuelResultPageModule {}
