import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderSubjectService } from './loader-subject.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tdp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  private loaderSubscriptionRef = new Subscription();

  showLoader = false;
  message:any="";
  constructor(
    private loaderSubjectService: LoaderSubjectService,
  ) {}

  ngOnInit(): void {
    this.loaderSubscription();
  }

  ngOnDestroy(): void {
    this.loaderSubscriptionRef.unsubscribe();
  }

  private loaderSubscription() {
    this.loaderSubscriptionRef = this.loaderSubjectService.loader$.subscribe((state) => {
      this.showLoader = state["condition"];
      if (this.showLoader==true){
        this.message=state["message"]
      }
      
    });
  }
}
