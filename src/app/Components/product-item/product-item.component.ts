import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductCart } from 'src/app/Models/ProductCart';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
 @Input() product:Product=new Product();
 productCart:ProductCart=new ProductCart();
 @Output() addToCardEvent:EventEmitter<ProductCart>=new EventEmitter<ProductCart>();
 amount:number=1;
  constructor() { }

  ngOnInit(): void {
  }
  
  addNewItem() {
    this.productCart={product:this.product,amount:this.amount};
    this.addToCardEvent.emit(this.productCart);
  }
}
