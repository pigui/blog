import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@blog/auth';
import { CustomValidators } from 'ngx-custom-validators';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'blog-register',
  templateUrl: './register.view.html',
  styleUrls: ['./register.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterView implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    ],
  });

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authFacade.isAuth$
      .pipe(
        takeUntil(this.destroyed$),
        filter((isAuth) => isAuth)
      )
      .subscribe(() => {
        this.router.navigateByUrl('private/home');
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.authFacade.onRegister(this.form.getRawValue());
  }
}
