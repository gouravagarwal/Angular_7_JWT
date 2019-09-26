import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';


@Component({
    templateUrl: 'update.html'
})


export class UpdateComponent {
    updateForm: FormGroup;
    currentUser: User;
    loading = false;
    error = "";

    constructor(private authService: AuthenticationService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
        this.authService.currentUser.subscribe(x => {
            this.currentUser = x;
            this.updateForm = this.formBuilder.group({
                firstName: [x.firstName, Validators.required],
                gender: [x.gender.toLowerCase().toString()]
            });

        })
    }

    onSubmit() {
        this.loading = true;

        if (!this.updateForm.invalid) {
            let user = this.currentUser;
            let values = this.updateForm.value;
            user.gender = values.gender;
            user.firstName = values.firstName;

            this.userService.update(user).subscribe(x => {
                this.router.navigate["/"];
                this.loading = false;
            },
                error => {
                    this.error = error;

                    this.loading = false;
                })
        }
        else {
            this.loading = false;
            this.error = "Complete the form properly";
        }
    }

}