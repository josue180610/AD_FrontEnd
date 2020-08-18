import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HijoscomunicacionService {
  //comunicacion entra hijos hacia el layout, para los eventos de sub meny y menu que esta conecttados en el header
  private eventMenu = new BehaviorSubject<Event | null>(null);
  private eventSub = new BehaviorSubject<Event | null>(null);
  event = this.eventMenu.asObservable();
  evento = this.eventSub.asObservable();
  menu(event: Event) {
    this.eventMenu.next(event);
  }
  sub(evento: Event){
    this.eventSub.next(evento);
  }
}
