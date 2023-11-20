import { Component, OnInit, inject } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AccountService } from '../_services/account.service';
import { error } from '@angular/compiler/src/util';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { state } from '@angular/animations';
import { map } from 'rxjs/operators';



@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    items: MenuItem[];
    model: any = {};
    currentUser$: Observable<User | null> = of(null);
    export: MenuItem[] = [
        {
            label: "Edit Profile",
            routerLink:'/member/edit'
        },

        {
            label: 'Logout',
            command: () => {
                this.logout();
            }

        }
    ];


    constructor(public accountService: AccountService, private router: Router,
        private messageService: MessageService, private guard: AuthGuard
    ) { }

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
        debugger
        console.log(this.model);
        this.accountService.login(this.model).subscribe({
            next: _ => this.router.navigateByUrl('/members'),

            error: error => {                
                console.log(error.error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
            }
        })

    }

    logout() {
        this.accountService.logout();
        this.router.navigateByUrl('/');
    }

    matches() {
debugger
    if(this.guard.sometext==false)
    this.messageService.add({ severity: 'error', summary: 'Error', detail: "you shall not pass"});
    }
}




