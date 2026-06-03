import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  lastId: number;
}

const inisitialState: TodosState = {
  todos: [
    { id: 2, completed: true, title: 'Acheter du pain' },
    { id: 3, completed: false, title: 'Terminer la formation' },
    { id: 4, completed: false, title: 'Acheter le dernier livre de Manuel Levy' },
  ],
  lastId: 4,
}


export const todoLisStore = signalStore(
  withState(inisitialState),
  withDevtools('todolist'),
  withComputed((store) => ({
    completedTodos: computed(() => store.todos().filter(t => t.completed)),
    remainingTodos: computed(() => store.todos().filter(t => !t.completed)),
  })),
  withMethods((store) => ({
    ajouter: (todo: Todo) => patchState(store, { todos: [...store.todos(), todo ], lastId: todo.id }),
    supprimer: (id: number) => patchState(store, { todos: store.todos().filter(t => t.id !== id) })
  })),
  withHooks({
    onInit: () => {
      // à la création du store
    },
    onDestroy: () => {
      // à la destruction du store
    }
  }),
);
