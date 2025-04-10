import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  login = this.formBuilder.group({
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
        updateOn: 'blur',
      },
    ],
  });

  async handleSubmit() {
    const email = this.login.value.email;
    const username = this.login.value.username;
    if (!email || !username) {
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3001/api/auth/login', {
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

      this.router.navigate(['users']);
      return;
    } catch (error: unknown) {
      return { datas: null, error: { message: error, code: 0 } };
    }
  }

  async logout() {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/auth/logout', {
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

      return;
    } catch (error) {
      return { datas: null, error: { message: error, code: 0 } };
    }
  }
}
