import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderSubjectService } from '../commons/components/loader/loader-subject.service';


@Injectable()
export class AuthService {
    array_permissions:Array<any>=[];
    array_roles:Array<any>=[];
    access_level:any="";
    menu_name:any=0;
    rol_name:any="";
    showLoader = false;
    
    constructor(private http: HttpClient,
        private loaderService: LoaderSubjectService,
        private router: Router,
        private loaderSubjectService: LoaderSubjectService,) {
    }
    
    /* getTemrAndCondition(idUser:any): Observable<any>{
        let param="?idUser="+idUser;
        return this.http.get(API_TER_GET_TERMS_CONDITION+param);
    }

    verifyUserTermsCondition(idTerms,idUser): Observable<any>{
        let param="?idUser="+idUser+"&idTerms="+idTerms;
        return this.http.get(API_TER_GET_TERMS_USER+param);
    }
 */
    logOut(){
        sessionStorage.clear();
    }

}
