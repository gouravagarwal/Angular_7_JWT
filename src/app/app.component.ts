import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import * as jwt_decode from "jwt-decode";

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    getBckGrndColor(token: any){
        //one way is by passing the token and than getting the value from it
        //other way is to get the token from 'localstorage.getitem('token')'
        ///other way is to simply pass the gender from the user
        
        let decodedToken = jwt_decode(token);
        let gender = decodedToken["gender"];

        switch(gender.toLowerCase()){
            case 'male':
                return 'CornflowerBlue';

            case 'female':
                return 'pink';

            default:
                return 'white';

        }
    }
}