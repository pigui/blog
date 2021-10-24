import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@blog/auth';
import { filter, Subject, takeUntil } from 'rxjs';

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
    this.authFacade.onLogin(this.form.getRawValue());
  }
}
