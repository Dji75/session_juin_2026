import { Routes } from '@angular/router';
import { authGuard } from './sharef/guards/auth-guard';

export default [
  {
    path: '',
    loadComponent: () => import('./components/home/home'),
    // component: Home,
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routing'),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routing'),
    canActivate: [authGuard],
  },
  {
    path: 'forms',
    loadComponent: () => import('./forms/forms'),
  },
  {
    path: 'stores',
    loadComponent: () => import('./stores/stores'),
  }
] satisfies Routes;
