import { Component, Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
   messageService=inject(MessageService);
   accountService=inject(AccountService);
  sometext:boolean;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    
    return this.accountService.currentUser$.pipe(
      map(user=>{
      
        if(user){
          this.sometext=true;
        return true;}
        else{
          this.sometext=false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "you shall not pass"});
          console.log(this.messageService+"hjtyh");
          return false;
        }
      })
    )
    // console.log("hjk")
    // alert("hello");
    // this.messageService.add({ severity: 'error', summary: 'Error', detail: "you shall not pass"});
    // return true;
  
  }
  
}

// export const authGuard: CanActivate={
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
//   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree}
//   const accountService=inject(AccountService);
//   const messageService=inject(MessageService);
// return accountService.currentUser$.pipe(
//   map(user=>{
//     debugger
//     if(user){
//       //this.sometext=true;
//     return true;}
//     else{
//       //this.sometext=true;
//       messageService.add({ severity: 'error', summary: 'Error', detail: "you shall not pass"});
//       console.log(messageService+"hjtyh");
//       return false;
//     }
//   })
// )

