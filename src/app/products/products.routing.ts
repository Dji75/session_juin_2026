import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./products'),
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create'),
  },
  {
    path: ':id',
    loadComponent: () => import('./details/details'),
  }
] satisfies Routes;
