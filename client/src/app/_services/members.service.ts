import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.production';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Member } from '../_models/member';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  //baseUrl=environment.apiUrl;
  baseUrl='https://localhost:7056/api/';
  somevar:any;

  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users');
  }

  getMember(username:string){
   return this.http.get<Member[]>(this.baseUrl+'users/'+username);
  }
  // getHttpOptions(){
  //   const userString=localStorage.getItem('user');
  //   if(!userString) return;
  //   const user=JSON.parse(userString);
  //   return{
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  //     })
  //   }
    
    
  // }




}
