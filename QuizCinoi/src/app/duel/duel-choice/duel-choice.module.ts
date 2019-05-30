import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DuelChoicePage } from './duel-choice.page';
import { UserHeaderComponent } from 'src/app/user-header/user-header.component';

const routes: Routes = [
  {
    path: '',
    component: DuelChoicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DuelChoicePage, UserHeaderComponent]
})
export class DuelChoicePageModule {}
