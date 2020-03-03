import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['../login/login.component.css']
})

export class RegisterComponent implements OnInit {

    registerForm: FormGroup

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
        ) {}

    ngOnInit() {
        this.registerFormInit();
    }

    registerFormInit() {
        this.registerForm = this.fb.group({
            userName: [null, [Validators.required]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            password: [null, [Validators.required]]
        })
    }

    submitForm() {
        this.userService.post('register', this.registerForm.value).subscribe(data => {
            if(data && data['success']) {
                alert('User created successfully, click ok to login');
                this.router.navigate(['/']);
            }
        })
    }
}