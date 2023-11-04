import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import {MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router:Router,private messageservice:MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        debugger
        if(error){
          switch(error.status){
            
            case 400:
              if(error.error.errors){
                const modelStateErrors:any=[];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              }
              else{
                this.messageservice.add({severity:'error', summary:'Service Message', detail:error.error});
              }
              break;
              case 401:
                this.messageservice.add({severity:'error', summary:'Unauthorised', detail:error.status.toString()});
                break;
              
              case 404:
                this.router.navigateByUrl('/not-found');
                break;
              
              case 500:
                const navigationExtras:NavigationExtras={state:{error:error.error}};
                this.router.navigateByUrl('/server-error',navigationExtras);
                break;
              default:
                this.messageservice.add({severity:'error', summary:'Service Message', detail:"Something unexpected went wrong"});
                console.log(error);
                break;         
          }
          return throwError( error );
        }
      })
    );
  }
}
