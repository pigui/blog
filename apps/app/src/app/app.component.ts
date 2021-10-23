import { Component, OnInit } from '@angular/core';
import { DisplayMode, ValdemortConfig } from 'ngx-valdemort';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderFacade } from '@blog/loader';

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    valdemortConfig: ValdemortConfig,
    private loaderFacade: LoaderFacade,
    private spinner: NgxSpinnerService
  ) {
    valdemortConfig.displayMode = DisplayMode.ONE;
    valdemortConfig.shouldDisplayErrors = () => true;
  }
  ngOnInit(): void {
    this.loaderFacade.isLoading$.subscribe((isLoading: boolean) => {
      if (isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
