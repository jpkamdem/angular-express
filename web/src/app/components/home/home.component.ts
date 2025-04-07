import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly fb = inject(FormBuilder);
  login = this.fb.nonNullable.group({
    email: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.email,
        ],
        updateOn: 'blur',
      },
    ],
    username: [
      '',
      {
        validators: [Validators.required, Validators.minLength(2)],
      },
    ],
  });

  async handleSubmit() {
    const email = this.login.value.email;
    const username = this.login.value.username;
    if (!email || !username) {
      return;
    }

    async function send(email: string, username: string) {
      try {
        const response = await fetch('http://127.0.0.1:3001/session/login', {
          signal: AbortSignal.timeout(10000),
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify({ email, username }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          return {
            datas: null,
            error: {
              message: response.statusText,
              code: response.status,
            },
          };
        }

        const datas = await response.json();
        console.log(datas);
        return;
      } catch (error: unknown) {
        return { datas: null, error: { message: error, code: 0 } };
      }
    }

    send(email, username);
  }

  async logout() {
    try {
      const response = await fetch('http://127.0.0.1:3001/session/logout', {
        signal: AbortSignal.timeout(10000),
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        return {
          datas: null,
          error: {
            message: response.statusText,
            code: response.status,
          },
        };
      }

      const datas = await response.json();
      console.log('Déconnexion: ', datas);
      return;
    } catch (error) {
      return { datas: null, error: { message: error, code: 0 } };
    }
  }
}
