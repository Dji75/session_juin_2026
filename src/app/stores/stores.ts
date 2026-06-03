import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { todoLisStore } from './store/my-signal-store.store';

@Component({
  selector: 'app-stores',
  imports: [],
  templateUrl: './stores.html',
  styleUrl: './stores.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [todoLisStore],
})
export default class Stores {
  protected readonly store = inject(todoLisStore);

  protected todos = this.store.todos;

  protected ajouterTodo(title: string): void {
    this.store.ajouter({ id:  (Math.random() * 5000),  title: title ?? '', completed: false });
  }

  protected supprimerTodo(id: number):void {
    this.store.supprimer(id);
  }
}
