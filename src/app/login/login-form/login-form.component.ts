import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sheard/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  message;
  submitted = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.onCreateForm();
  }

  onCreateForm(): void {
    this.loginForm = this.fb.group({
      userName: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.message = this.auth.login(this.loginForm.value);
    }
  }

  get LoginFormControls() {
    return this.loginForm.controls;
  }
}
