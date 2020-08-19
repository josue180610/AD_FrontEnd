import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderSubjectService } from './commons/components/loader/loader-subject.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tdp-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  private routerSubscriptionRef = new Subscription();

  constructor(
    private loaderService: LoaderSubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRouterSubscription();
  }

  ngOnDestroy(): void {
    this.routerSubscriptionRef.unsubscribe();
  }

  private loadRouterSubscription() {
    this.routerSubscriptionRef = this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loaderService.showLoader("Cargando..");
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loaderService.closeLoader();
      }
    });
  }

}
