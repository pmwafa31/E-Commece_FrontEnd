import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HttpClientModule } from "@angular/common/http";
import { FilterPipe } from './pipes/filter.pipe';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrdersComponent } from './orders/orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';


@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    ViewProductComponent,
    CartComponent,
    WishlistComponent,
    FilterPipe,
    CheckoutComponent,
    UserHomeComponent,
    UserHeaderComponent,
    ProductHeaderComponent,
    InvoiceComponent,
    OrdersComponent,
    OrderdetailComponent
     
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class ProductsModule { }
