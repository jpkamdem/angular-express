import { Component, effect, signal } from '@angular/core';
import { User } from '../../types/user';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users = signal<User[] | null>(null);

  constructor() {
    effect(() => {
      fetch('http://127.0.0.1:3001/api/users', {
        signal: AbortSignal.timeout(10000),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((datas) => {
          if (!Array.isArray(datas)) {
            return datas;
          }

          this.users.set(datas);
        });
    });
  }
}
