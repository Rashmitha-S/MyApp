import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AccountService } from '../_services/account.service';
import { error } from '@angular/compiler/src/util';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';



@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    items: MenuItem[];
    model: any = {};
    currentUser$:Observable<User|null>=of(null);
    export: MenuItem[] = [
        {
            label: "Edit Profile",
        },

        {
            label: 'Logout',
            command: () => {
                this.logout();
            }

        }
    ];


    constructor(public accountService: AccountService) { }

    ngOnInit() {
       // this.getCurrentUser();
       //this.currentUser$=this.accountService.currentUser$;
    }


    // getCurrentUser(){
    //     this.accountService.currentUser$.subscribe({
    //         next:user=>this.loggedIn=!!user,
    //         error:error=>console.log(error)
    //     })
    // }



    login() {
  
        console.log(this.model);
        this.accountService.login(this.model).subscribe({
            next: response => {
                console.log(response);
            },
            error: error => console.log(error)
        })

    }

    logout() {
        this.accountService.logout();
    }


}


