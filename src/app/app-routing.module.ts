import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from 'process';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path:"",component:ProductListComponent},
  {path:"productDetails/:id",component:ProductItemDetailComponent},
  {path:"ShoppingCart",component:CartComponent},
  {path:"confirmation",component:ConfirmationComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
