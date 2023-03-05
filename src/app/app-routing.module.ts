import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  //path for lazy loaded products module
  { 
    path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
  },

   //path to get all products page in product module
  {
    path:'all_products', redirectTo:'products', pathMatch:'full'
  },
  
  {
    path:'', redirectTo:'home', pathMatch:'full'
  },

  //path for home page
  {
    path:'home', component:HomeComponent
  },

  //path for register page
  {
    path:'register', component:RegisterComponent
  },

   //path for login page
   {
    path:'login', component:LoginComponent
  },

  {
    path:'**', component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
