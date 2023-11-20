import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.production';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Member } from '../_models/member';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  //baseUrl=environment.apiUrl;
  baseUrl='https://localhost:7056/api/';
  members:Member[]=[];
  somevar:any;

  constructor(private http:HttpClient) { }

  getMembers(){
   // return this.http.get<Member[]>(this.baseUrl+'users');
    if(this.members.length>0)return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map(members=>{
        this.members=members;
        return members;
      })
    );
  }

  getMember(username:string){
    //  const member=this.members.find(x=>x.userName===username);
    // if(member) return of(member);
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

  updateMember(member:Member, username:string){
    debugger
   return this.http.put(this.baseUrl+'users/'+username,member).pipe(
    map(()=>{
      const index=this.members.indexOf(member);
      this.members[index]={...this.members[index],...member};
    })
   );
  }
}
