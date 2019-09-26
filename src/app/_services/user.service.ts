import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private  authService: AuthenticationService) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    update(user: User){
        return this.http.post<User>(`${config.apiUrl}/Users/update`,user).pipe(
            map(user => {
                this.authService.setToken(user);

                return user;
            })
        );
    }
}