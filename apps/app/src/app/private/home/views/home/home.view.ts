import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeFacade } from '@blog/home';

@Component({
  selector: 'blog-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeView implements OnInit {
  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    text: ['', [Validators.required]],
  });
  constructor(public homeFacade: HomeFacade, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.homeFacade.init();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.homeFacade.createBlog(this.form.getRawValue());
  }
}
