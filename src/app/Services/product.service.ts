import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';
import { ProductCart } from '../Models/ProductCart';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCartList:ProductCart[]=[]
  constructor(private http:HttpClient) { }
  getProducts():Observable<Product[]>{
    debugger;
    return this.http.get<Product[]>("/assets/data.json");
  }
  removeProduct(){
    localStorage.removeItem("productCartList")
  }
  setProductInCart(productCart:ProductCart){
     if(localStorage.getItem("productCartList"))
         this.productCartList=JSON.parse(localStorage.getItem("productCartList")!);
      if(this.productCartList.some(x=>x.product.id==productCart.product.id))
      {
          this.productCartList.forEach(e=>{
            if(e.product.id==productCart.product.id)
               e.amount=productCart.amount;
          })
          
      }else{
        this.productCartList.push(productCart);
      }
          
      localStorage.setItem("productCartList", JSON.stringify(this.productCartList))
  }
  getProductListCart(){
    if(localStorage.getItem("productCartList"))
    {
      this.productCartList=JSON.parse(localStorage.getItem("productCartList")!);
      this.productCartList.forEach(e=>{
        e.amount= +e.amount;
      })
    }
    return this.productCartList;
  }
  editAmount(proudctCart:ProductCart){
    if(localStorage.getItem("productCartList"))
    {
      this.productCartList=JSON.parse(localStorage.getItem("productCartList")!);
      this.productCartList.forEach(x=>{
        if(x.product.id==proudctCart.product.id){
          x.amount=proudctCart.amount
        }
      })
      localStorage.setItem("productCartList",JSON.stringify(this.productCartList))
    }
  }
  removeProductFromCart(id:number){
    debugger
    if(localStorage.getItem("productCartList"))
    {
      this.productCartList=JSON.parse(localStorage.getItem("productCartList")!);
      this.productCartList=this.productCartList.filter(x=>{
         return x.product.id!=id;
      })
    }
      localStorage.setItem("productCartList",JSON.stringify(this.productCartList))
    return this.productCartList;
  }
}
