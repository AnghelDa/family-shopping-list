import { Routes } from '@angular/router';
import { Suggested } from './pages/suggested/suggested';
import { ShoppingList } from './pages/shopping-list/shopping-list';

export const routes: Routes = [
  { path: '', redirectTo: 'suggested', pathMatch: 'full' },
  { path: 'suggested', component: Suggested },
  { path: 'shopping-list', component: ShoppingList },
];
