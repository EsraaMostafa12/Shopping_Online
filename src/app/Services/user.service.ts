import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  setUser(user:User){
     localStorage.setItem("User",JSON.stringify(user))
  }
  getUser(){
    return JSON.parse(localStorage.getItem("User")!)
  }
  removeuser(){
    localStorage.removeItem("User")
  }
}
