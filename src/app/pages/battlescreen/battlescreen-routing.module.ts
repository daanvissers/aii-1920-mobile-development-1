import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BattlescreenPage } from './battlescreen.page';

const routes: Routes = [
  {
    path: '',
    component: BattlescreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BattlescreenPageRoutingModule {}
