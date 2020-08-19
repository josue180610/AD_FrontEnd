import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './commons/guards/auth.guard';
 const routes: Routes = [
  {
    path: 'login',
    loadChildren: './business/login/login.module#LoginModule'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'module1',
        loadChildren: './business/module1/module1.module#Module1Module'
      },
      {
        path: 'module2',
        loadChildren: './business/module2/module2.module#Module2Module'
      },
      {
        path: '',
        loadChildren: './business/home/home.module#HomeModule'
      },
      {
        path: 'sign-up',
        loadChildren: './business/sign-up/sign-up.module#SignUpModule'
      },
      {
        path: 'invoices',
        loadChildren: './business/invoices/invoices.module#InvoicesModule'
      },
      {
        path: 'invoice-admin',
        loadChildren: './business/invoice-admin/invoice-admin.module#InvoiceAdminModule'
      },
      {
        path:"coronavirus",
        loadChildren:'./business/coronavirus/coronavirus.module#CoronavirusModule'
      },
      {
        path:'terceros',
        loadChildren:'./business/terceros/terceros.module#TercerosModule'
      }
 
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
