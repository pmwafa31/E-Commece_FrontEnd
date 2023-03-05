import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { OrdersComponent } from './orders/orders.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [

  //path for all products page
  { 
    path: '', component: AllProductsComponent 
  },

   //path for user home
   {
    path:'user_home', component:UserHomeComponent
   },
   //path for view product
   {
    path:'view_product/:id', component:ViewProductComponent
   },

   //path for cart
   {
    path:'cart', component:CartComponent
   },

   //path for wishlist
   {
    path:'wishlist', component:WishlistComponent
   },

   //path for checkout
   {
    path:'checkout', component:CheckoutComponent
   },

    //path for invoice
    {
      path:'invoice/:id', component:InvoiceComponent
     },

     //path for orders
    {
      path:'orders', component:OrdersComponent
     },

     //path for particular ordder
    {
      path:'order_details/:id', component:OrderdetailComponent
     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
