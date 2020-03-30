import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { // Entry point of the app are the Tabs, further routing goes from there
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { // Dex-entry Details page
    path: 'tabs/dex/:index',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule)
  },
  { // Geolocation map
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule)
  },
  { // User's profile with login
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  { // Register page
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  { // Battle screen when clicked on a Pokémon
    path: 'battlescreen/:index',
    loadChildren: () => import('./pages/battlescreen/battlescreen.module').then( m => m.BattlescreenPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
