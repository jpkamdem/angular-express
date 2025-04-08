import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/components/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../app/components/users/users.component').then(
        (c) => c.UsersComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
