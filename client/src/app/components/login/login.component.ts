import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private globalService: GlobalService
    ) {}

    ngOnInit() {
        this.loginFormInit();
    }

    loginFormInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            password: ['', [Validators.required]]
        })
    }

    submitForm() {
        this.userService.login(this.loginForm.value).subscribe(data => {
            if(data && data['success']) {
                this.globalService.setLogin(true);
                localStorage.setItem('token', data['token']);
                localStorage.setItem('user', JSON.stringify(data['user']));
                this.router.navigate(['/product']);
            }
        })
    }
}