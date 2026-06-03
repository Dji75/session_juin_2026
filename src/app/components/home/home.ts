import { Component, computed, model, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
// import { deepSignal } from '@angular/forms/signals';

@Component({
  selector: 'app-home',
  imports: [
    JsonPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {
  readonly monUser = signal({
    id: 'an id',
    name: 'test',
    age: 23,
    roles: {
      guest: false,
      admin: true,
    }
  });

  readonly monUserModelSignal = model(this.monUser());

  readonly monUserRole = computed(() => {
    console.log('nested evaluation');
    return this.monUser().roles.guest;
  })

  readonly monUserModelRole = computed(() => {
    console.log('Optimized nested evaluation');
    return this.monUserModelSignal().roles.guest;
  })

  protected changeRoleGuest() {
    this.monUser.update((user) => ({...user, roles: { ...user.roles, guest: !user.roles.guest }}))
  }

  protected updateName() {
    this.monUser.update((user) => ({ ...user, name: `new name ${ (Math.random() * 100).toFixed(0) }` }));
  }
}
