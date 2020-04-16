import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inicio/inicio.module').then(m => m.InicioPageModule)
          }
        ]
      },
      {
        path: 'dicas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dicas/dicas.module').then(m => m.DicasPageModule)
          }
        ]
      },
      {
        path: 'noticias',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../noticias/noticias.module').then(m => m.NoticiasPageModule)
          }
        ]
      },
      {
        path: 'alertas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../alertas/alertas.module').then(m => m.AlertasPageModule)
          }
        ]
      },
      {
        path: 'situacao',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../situacao/situacao.module').then(m => m.SituacaoPageModule)
          }
        ]
      },
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/app/inicio',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TabsPageRoutingModule {}
