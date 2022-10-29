import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/Models/ProductCart';
import { User } from 'src/app/Models/User';
import { ProductService } from 'src/app/Services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productCartList:ProductCart[]=[];
  user:User;
  dataform:FormGroup;
  submitted:boolean=false;
  get frm(){
    return this.dataform.controls;
  }
  totalPrice:number=0;
  constructor(private productService:ProductService,
              private userService:UserService,
              private route:Router) { }
  
  ngOnInit(): void {
    this.user=new User();
    this.dataform=new FormGroup({
      fullname:new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)])),
      address:new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)])),
      creditCardNumber:new FormControl('',Validators.compose([Validators.pattern("^[1-9]+[0-9]*$"), Validators.required,Validators.minLength(16),
                                          Validators.maxLength(16)])),
    });
    this.productCartList=this.productService.getProductListCart();
    this.productCartList=this.productService.getProductListCart();
    this.calculateTotalPrice();
  }
  
  modelChanged(value:number,productCart:ProductCart){

    if(value==0){
       this.productCartList=this.productService.removeProductFromCart(productCart.product.id);
       this.calculateTotalPrice();
       alert(`${productCart.product.name} has removed from cart`);
    }else{
      productCart.amount=value;
      this.productService.editAmount(productCart)
      this.calculateTotalPrice();
    }
  }
  submit(){
    debugger;
    this.submitted=true;
    if(this.dataform.invalid){
      return;
    }
    this.userService.setUser(this.user);
    this.route.navigate(["confirmation"]);
  }
  calculateTotalPrice(){
    this.totalPrice=0;  
    this.productCartList.forEach(x=>{
      this.totalPrice += x.amount*x.product.price;
    })
  }
}
