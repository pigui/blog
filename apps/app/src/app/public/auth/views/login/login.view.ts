import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@blog/auth';

@Component({
  selector: 'blog-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginView implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    ],
  });
  constructor(private authFacade: AuthFacade, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.authFacade.onLogin(this.form.getRawValue());
  }
}
