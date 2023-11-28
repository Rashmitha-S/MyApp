import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.production';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Member } from '../_models/member';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {PaginatedResult} from '../_models/pagination';
import {UserParams} from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  //baseUrl=environment.apiUrl;
  baseUrl='https://localhost:7056/api/';
  members:Member[]=[];
  somevar:any;
  memberCache=new Map();
  userParams: UserParams|undefined;
  user: User|undefined;
  //paginatedResult:PaginatedResult<Member[]>=new PaginatedResult<Member[]>();

  constructor(private http:HttpClient,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user=>{
        if(user)
        {
          this.userParams=new UserParams(user);
          this.user=user;
        }
      }
    })
   }

   getUserParams() {
    return this.userParams;
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  getMembers(UserParams:UserParams){
    const response=this.memberCache.get(Object.values(UserParams).join('-'));

    let params = this.getPaginationHeaders(UserParams.pageNumber,UserParams.pageSize);

    params=params.append('minAge',UserParams.minAge.toString());
    params=params.append('maxAge',UserParams.maxAge.toString());
    params=params.append('gender',UserParams.gender.toString());
    params=params.append('OrderBy',UserParams.OrderBy.toString());
   // return this.http.get<Member[]>(this.baseUrl+'users');
   // if(this.members.length>0)return of(this.members);
    return this.getPaginatedResult<Member[]>( params).pipe(map(response=>{
      this.memberCache.set(Object.values(UserParams).join('-'),response);
      return response;
    }));
  }

  private getPaginatedResult<T>(params: HttpParams) {
    const paginatedResult:PaginatedResult<T>= new PaginatedResult<T>();
    return this.http.get<T>(this.baseUrl + 'users/', { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber:number,pageSize:number) {
    let params = new HttpParams();


      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());

    return params;
  }

  getMember(username:string){
    const member=[...this.memberCache.values()]
    .reduce((arr,ele)=>arr.concat(ele.result),[])
    .find((member:Member)=>member.userName===username);
    if(member) return of(member);
    console.log(member);
    //  const member=this.members.find(x=>x.userName===username);
    // if(member) return of(member);
   return this.http.get<Member[]>(this.baseUrl+'users/'+username);
  }
//   getHttpOptions(){
//     const userString=localStorage.getItem('user');
//     if(!userString) return;
//     const user=JSON.parse(userString);
//     return{
//       headers: new HttpHeaders({
//         Authorization: 'Bearer ' + user.token
//       })
//     }
//  }

  updateMember(member:Member){
    debugger
   return this.http.put(this.baseUrl+'users/',member).pipe(
    map(()=>{
      const index=this.members.indexOf(member);
      this.members[index]={...this.members[index],...member};
    })
   );
  }
  setMainPhoto(photoId: number,username:string) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' +username+'/'+ photoId, {});
  }

  deletePhoto(photoId: number,username:string) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' +username+'/'+ photoId);
  }

}
