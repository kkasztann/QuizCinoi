import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DuelDuelResultPage } from './duel-duel-result.page';
import { UserHeaderComponent } from 'src/app/user-header/user-header.component';

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
  declarations: [DuelDuelResultPage, UserHeaderComponent]
})
export class DuelDuelResultPageModule {}
