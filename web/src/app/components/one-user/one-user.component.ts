import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../types/user';

@Component({
  selector: 'app-one-user',
  imports: [RouterLink],
  templateUrl: './one-user.component.html',
  styleUrl: './one-user.component.css',
})
export class OneUserComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userId = Number(
    this.activatedRoute.snapshot.paramMap.get('id')
  );

  private readonly users = signal<User[]>([]);
  readonly user = signal<User | null>(null);

  constructor() {
    effect(() => {
      fetch('https://jsonplaceholder.typicode.com/users', {
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

      const foundUser = this.users().find((user) => user.id === this.userId);
      if (!foundUser) {
        return;
      }

      this.user.set(foundUser);
    });
  }
}
