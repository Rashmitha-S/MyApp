import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ToastModule } from 'primeng/toast';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
[x: string]: any;
  member:Member[]|undefined;
  user:User|any;
  messages:any;
  messages1:any;
  validationErrors:string[]=[];
  @ViewChild('editForm') editForm:NgForm| undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService:AccountService,private memberservice:MembersService,
    private messageservice:MessageService) { 
      debugger
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user=>this.user=user.username
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
    debugger
    if(!this.user)return;
    this.memberservice.getMember(this.user).subscribe({
      next:member=>this.member=member
    });
  }

  updateMember(){
  
   // this.editForm.addControl(username)
   //this.editForm?.delete('file',"io");
    debugger
    this.memberservice.updateMember(this.editForm?.value,this.user).subscribe({
      next:_=>{
       
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Profile uploaded successfully' });
   this.editForm?.reset(this.member);

      }
    })
 

  }

}
