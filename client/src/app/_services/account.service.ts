import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { User } from '../_models/user'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl="https://localhost:7056/api/";
  private CurrentUserSource=new BehaviorSubject<User>(null);
  currentUser$=this.CurrentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  // login(model:any){
  //  return this.http.post(this.baseUrl+'account/login',model)
  // }

  login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((response:User)=>{
        const user=response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
      })
    )
   }

   register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map(user=>{
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
       // return user;
      })
    )
   }

   setCurrentUser(user:User){
    this.CurrentUserSource.next(user);
   }

   logout(){
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
   }
}
