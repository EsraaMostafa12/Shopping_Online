import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';
import { Subscription } from 'rxjs'; 
import { ProductCart } from 'src/app/Models/ProductCart';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit,OnDestroy {
    id:number;
    productsSubScription:Subscription;
    routeSubScription:Subscription;
    amount:number=1;
  constructor(private route:ActivatedRoute,private productService:ProductService,
              private router:Router) { }
   product:Product;
  ngOnInit(): void {
    this.product=new Product();
    this.route.params.subscribe(p => {
      if (p["id"]) {
          this.id = +p["id"];
          this.updateForProduct();
      }
  });
  }
  updateForProduct(){
    this.productsSubScription=this.productService.getProducts().subscribe(data=>{
      this.product=data.filter(x=>x.id==this.id)[0];
    })
  }
  ngOnDestroy(): void {
    //this.routeSubScription.unsubscribe();
    //this.productsSubScription.unsubscribe();
  }
  addToCard(){
    let productCart:ProductCart={product:this.product,amount:this.amount};
    this.productService.setProductInCart(productCart)
    alert(`${this.product.name} is added to cart`);
  }
}
