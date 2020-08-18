import { Component } from '@angular/core';
import { LoginFormReactive } from './login-form.reactive';
import { LoginPasswordErrors,LoginEmailErrors } from './login-form-errors.enum';
import { LoaderSubjectService } from '../../../../../commons/components/loader/loader-subject.service';
import { TDPLocalStorageService } from '@tdp/ng-commons';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { URL_POST_SESSION } from '../../../../../../app/services/url.constants';
 

// CommonJS
//const Swal = require('sweetalert2')
@Component({
  selector: 'tdp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [LoginFormReactive]
})
export class LoginFormComponent {
  // loginDocumentErrors = LoginDocumentErrors;
  loginPasswordErrors = LoginPasswordErrors;
  loginEmailErrors = LoginEmailErrors;
  loginError = '';
  showError = false;

  constructor(
    public loginFormReactive: LoginFormReactive,
    private loaderSubjectService: LoaderSubjectService,
    private localStorageService: TDPLocalStorageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.validateSession();
  }

  private validateSession() {
    /* if (this.localStorageService.getItem(environment.sessionKeyName)) {
      this.router.navigateByUrl('/');
    } */
    if (localStorage.getItem("auth") ){
      this.router.navigateByUrl('/');
    }
  }

  login() {
    /* if (this.loginFormReactive.loginForm.invalid) {
      this.showError = true;
      return;
    } */
    const email = this.loginFormReactive.email.value;
    const password = this.loginFormReactive.password.value;
    this.loaderSubjectService.showLoader();

    const request = {
      email, password
    } 
    let headers = new HttpHeaders({
      "request-id":"550e8400-e29b-41d4-a716-446655440000",
      "request-appication":"WEB_MOVISTAR_CONTIGO",
      "request-user":"1",
      "request-date":"2019-08-01T17:15:20.509-0400"
    });
    let options = { headers : headers };
    
    this.http.post(URL_POST_SESSION,request,options ).toPromise().then(resp => {
      console.log(resp);
      if (resp['auth']){
        let modules = [];
        let access = resp['modules'];
        let user=[];

        access.forEach(access => {
            let accesslvl = {
              accessType: access.accessType,
              socity: access.society.code
            } 
  
            let view = {
              code: access.view.code,
              name: access.view.name,
              path: access.view.path,
              access: []
            }
  
            view.access.push(accesslvl);
  
            let modulef = modules.find(p => p.code === access.view.moduleCode )
            if (modulef){
              // MODULO YA EXISTE
              let viewf =  modulef.views.find(v => v.code === view.code);
              if (viewf){
                // VISTA YA EXISTE
                let societyf = viewf.access.find(s => s.socity === accesslvl.socity);
                
                if (societyf){
                  // YA TIENE ACCESO A LA SOCIEDAD
                  const priority = ['READ', 'WRITE', 'DELETE', 'MASTER'];
                  const oldidx = priority.findIndex(p => p === societyf.accessType);
                  const newidx = priority.findIndex(p => p === accesslvl.accessType);
                  if (newidx > oldidx){
                    // SI LA PRIORIDAD DEL ACCESO ES MAYOR
                    societyf.accessType = accesslvl.accessType;
                  }
                }else{
                  // NO TENÍA ACCESO A LA SOCIEDAD
                  viewf.access.push(accesslvl);
                }
              }else{            
                // VISTA NO EXISTE
                modulef.views.push(view);
              }
            }else{
              // MODULO NO EXISTE
              let module = {
                code: access.view.moduleCode,
                path: access.view.path.split("/")[1],
                name: access.view.moduleName,
                views: []
              }
              module.views.push(view);
              modules.push(module);
            }
  
        }); 
        //se crean locale storage con la data marcada    
        localStorage.setItem("modules",JSON.stringify(modules));
        localStorage.setItem("user",JSON.stringify(request.email));
        localStorage.setItem("auth", "auth token");
        this.router.navigateByUrl('/').then(() => {
          this.loaderSubjectService.closeLoader();
        });
      }else{
        this.loaderSubjectService.closeLoader();
        this.loginError = 'Credenciales incorrectas';
      }

   }).catch( e => {
     this.loaderSubjectService.closeLoader();
     if (e.status === 404){
       this.loginError = 'Usuario no encontrado';
     }else if (e.status === 500){
      this.loginError = 'Error en el servidor';
     }
   });

    
  }
}
