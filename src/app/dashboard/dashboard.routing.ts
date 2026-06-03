import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./dashboard'),
    children: [
      {
        path: '',
        loadComponent: () => import('./core/home/home'),
      },
      {
        path: 'analytics',
        loadComponent: () => import('./analytics/analytics'),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings'),
      }
    ]
  }

] satisfies Routes;
