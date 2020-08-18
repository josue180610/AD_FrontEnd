/* import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './core/reducers';
import { environment } from '../environments/environment';
import { TokenService} from './core/auth/_services/Token.sevice';

@Injectable({
    providedIn: 'root',
})
@Component({
	selector: 'kt-general',
	templateUrl: './general.html'
})


export class GeneralComponent implements OnInit {
    userFlag=false;    
    constructor(private store: Store<AppState>) {

    }
    
	ngOnInit(): void {
    }

    validateSession(menu:string):number {
        const token = new TokenService();
        const permissions = [...token.getDatoFromToken().permissions];
        if (permissions.filter(p=>p.menu_name === menu).length === 0){
            this.store.dispatch(new Logout());
            return 0;
        }
        
        if(!token.isLogedIn()){
            this.store.dispatch(new Logout());
            return 0;
        }
        return 1;
    }
}
 */