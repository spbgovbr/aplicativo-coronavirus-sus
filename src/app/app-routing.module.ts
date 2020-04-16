import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then(m => m.MapaPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'termo',
    loadChildren: () => import('./pages/termos-de-uso/termos-de-uso.module').then(m => m.TermosDeUsoPageModule)
  },
  {
    path: 'stories',
    loadChildren: () => import('./pages/stories/stories.module').then(m => m.StoriesPageModule)
  },
  {
    path: 'teste',
    loadChildren: () => import('./pages/teste/teste.module').then(m => m.TestePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
