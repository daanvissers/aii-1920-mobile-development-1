import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BattlescreenPageRoutingModule } from './battlescreen-routing.module';

import { BattlescreenPage } from './battlescreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BattlescreenPageRoutingModule
  ],
  declarations: [BattlescreenPage]
})
export class BattlescreenPageModule {}
