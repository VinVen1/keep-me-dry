import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./features/homepage/homepage.component').then(c => c.HomepageComponent)
}];
