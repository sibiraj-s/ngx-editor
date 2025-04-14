import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./editor.component').then((m) => m.EditorComponent),
    title: 'Ngx Editor',
  },
];
