import { Component, inject } from '@angular/core';
import { ItemsService } from '../../services/items';

@Component({
  selector: 'app-shopping-list',
  imports: [],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
})
export class ShoppingList {
  items = inject(ItemsService);
}
