import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/Models/ProductCart';
import { User } from 'src/app/Models/User';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  user:User;
  productList:ProductCart[]=[];
  totalPrice:number=0;
  constructor(private userService:UserService,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit(): void {
    this.user=new User();
    this.user=this.userService.getUser();
    this.productList=this.productService.getProductListCart();
    this.calculateTotalPrice();
  }
  calculateTotalPrice(){
    this.totalPrice=0;  
    this.productList.forEach(x=>{
      this.totalPrice += x.amount*x.product.price;
    })
  }
  backToProductList(){
    this.productService.removeProduct();
    this.userService.removeuser();
    this.router.navigate(['/'])
  }
}
