import { Component, OnInit,OnDestroy} from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';
import { Subscription } from 'rxjs';  
import { ProductItemComponent } from '../product-item/product-item.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit ,OnDestroy {
model:Product[]=[];
ProductsSubScription:Subscription;
  constructor(private productService:ProductService) { }
  listProductSubScription:Subscription
  ngOnInit(): void {
    debugger;
   this.ProductsSubScription= this.productService.getProducts().subscribe(data=>{
      this.model=data;
    })
    
  }
  ngOnDestroy(){
    this.ProductsSubScription.unsubscribe();
  }
  addToCard(productCart:any){
    this.productService.setProductInCart(productCart)
    alert(`${productCart.product.name} is added to cart`);
  }
}
