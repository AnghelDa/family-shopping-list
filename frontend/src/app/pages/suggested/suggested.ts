import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../services/items';

@Component({
  selector: 'app-suggested',
  imports: [FormsModule],
  templateUrl: './suggested.html',
  styleUrl: './suggested.scss',
})
export class Suggested {
  items = inject(ItemsService);
  suggestionName = '';
  heard = signal('');
  listening = signal(false);
  confirmingId = signal<string | null>(null);

  addSuggestion() {
    this.items.addSuggestion(this.suggestionName).subscribe({
      next: () => {
        this.suggestionName = '';
      },
    });
  }

  listen() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.heard.set('Browserul tau nu suporta comanda vocala.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ro-RO';

    recognition.onstart = () => this.listening.set(true);
    recognition.onend = () => this.listening.set(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.trim().replace(/[.,!?]+$/, '');
      this.heard.set(text);
      this.items.addSuggestion(text).subscribe();
    };
    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        this.heard.set('Nu am permisiunea sa folosesc microfonul.');
      } else if (event.error === 'no-speech') {
        this.heard.set('Nu am auzit nimic. Incearca din nou.');
      } else {
        this.heard.set('eroare la recunoasterea vocala.');
      }
    };
    recognition.start();
  }

  askDelete(id: string) {
    this.confirmingId.set(id);
  }

  confirmDelete(id: string) {
    this.items.deleteItem(id);
    this.confirmingId.set(null);
  }

  cancelDelete() {
    this.confirmingId.set(null);
  }
}
