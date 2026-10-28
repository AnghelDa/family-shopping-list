import { computed, inject, Injectable, signal } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export const normalize = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const API_URL = 'http://localhost:3000/items';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private http = inject(HttpClient);
  private _items = signal<Item[]>([]);
  readonly catalog = this._items.asReadonly();
  readonly shoppingList = computed(() => this._items().filter((i) => i.onList));
  readonly errorMessage = signal<string | null>(null);
  private handleError(err: HttpErrorResponse) {
    if (err.status === 0) {
      this.errorMessage.set('Nu ma pot conecta la server.Verifica conexiunea.');
    } else if (err.status === 409) {
      this.errorMessage.set('Acest articol exista deja pe lista.');
    } else if (err.status === 404) {
      this.errorMessage.set('Articolul nu mai exista. Reincarc lista.');
    } else {
      this.errorMessage.set('A aparut o eroare.Incearca din nou.');
    }
  }

  constructor() {
    this.loadItems();
  }

  private loadItems() {
    this.http.get<Item[]>(API_URL).subscribe({
      next: (items) => this._items.set(items),
      error: (err) => this.handleError(err),
    });
  }

  addSuggestion(name: string) {
    this.errorMessage.set(null);
    this.http.post<Item>(API_URL, { name }).subscribe({
      next: () => this.loadItems(),
      error: (err) => this.handleError(err),
    });
  }

  toggleOnList(id: string) {
    const item = this._items().find((i) => i._id === id);
    if (!item) return;
    this.http.patch(`${API_URL}/${id}`, { onList: !item.onList }).subscribe({
      next: () => this.loadItems(),
      error: (err) => this.handleError(err),
    });
  }

  toggleChecked(id: string) {
    const item = this._items().find((i) => i._id === id);
    if (!item) return;

    this.http.patch(`${API_URL}/${id}`, { checked: !item.checked }).subscribe({
      next: () => this.loadItems(),
      error: (err) => this.handleError(err),
    });
  }

  deleteItem(id: string) {
    this.errorMessage.set(null);

    this.http.delete(`${API_URL}/${id}`).subscribe({
      next: () => this.loadItems(),
      error: (err) => this.handleError(err),
    });
  }
}
