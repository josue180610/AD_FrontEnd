import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderSubjectService } from '../commons/components/loader/loader-subject.service';
import { TDPLocalStorage } from '@tdp/ng-commons';
import { Module } from './auth.model';

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
        private loaderSubjectService: LoaderSubjectService,
        private localStorageService:TDPLocalStorage) {
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
    getTokenUser(){
        return JSON.parse(localStorage.getItem("userDTO"));
    }
    getTokenModule(){
        return JSON.parse(localStorage.getItem("permissionDTO"));
    }
    getValidateMenuByUser(menu:any){
        let permission :Array<Module>=[]
        permission= JSON.parse(localStorage.getItem("permissionDTO"));
        let index= permission.indexOf(permission.find(d=>d.view.name==menu));
        console.log(index)
        if (index<0){
            this.logoutV2();
        }else{
            console.log("Tienes permitido")
        }

    }
    //destruye el local storage
  logoutV2() {
    this.loaderSubjectService.showLoader("Saliendo del sistema..");
    localStorage.removeItem('modules');
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    localStorage.clear();
    setTimeout(() => {
      this.loaderSubjectService.closeLoader(); 
      this.router.navigateByUrl('/login');
    }, 2000);
  };
    logOut(){
        sessionStorage.clear();
    }

}
