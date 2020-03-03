import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private router: Router,
                private globalService: GlobalService) {}

    isLoggedIn() {
        let token = localStorage.getItem("token");
        if (!token) return false;
        if(token) {
            if (Date.now() >= jwtDecode(token).exp * 1000) {
                return false;
            }
            this.globalService.setLogin(true);
            return true;
        }
    }

    logOut() {
        this.globalService.setLogin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(["/"]);
    }
}