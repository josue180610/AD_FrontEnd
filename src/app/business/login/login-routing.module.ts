import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { HttpClientModule} from "@angular/common/http";
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        loadChildren: './views/login-page/login-page.module#LoginPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {
}
