import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: (): any => import('./dynamic-table/dynamic-table.component').then(m => m.DynamicTableComponent),
}];

