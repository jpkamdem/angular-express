import { Component, signal } from '@angular/core';
import { User } from '../../types/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users = signal<User[] | null>(null);

  constructor() {
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
  }
}
