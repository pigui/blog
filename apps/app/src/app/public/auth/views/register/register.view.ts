import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@blog/auth';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'blog-register',
  templateUrl: './register.view.html',
  styleUrls: ['./register.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterView implements OnInit {
  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
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
    this.authFacade.onRegister(this.form.getRawValue());
  }
}
