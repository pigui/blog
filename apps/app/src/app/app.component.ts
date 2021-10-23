import { Component } from '@angular/core';
import { DisplayMode, ValdemortConfig } from 'ngx-valdemort';

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(valdemortConfig: ValdemortConfig) {
    valdemortConfig.displayMode = DisplayMode.ONE;
    valdemortConfig.shouldDisplayErrors = () => true;
  }
}
