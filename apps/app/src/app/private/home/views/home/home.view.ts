import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeView implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
