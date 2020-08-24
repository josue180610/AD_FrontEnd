import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderSubjectService {
  private loaderSubject = new BehaviorSubject(false);
  loader$ = this.loaderSubject.asObservable();

  showLoader(text: any) {
    if (this.loaderSubject.getValue()) {
      return;
    }
    let json = {
      condition: true,
      message: text,
    };
    this.loaderSubject.next(json);
  }

  closeLoader() {
    this.loaderSubject.next(false);
  }
}
