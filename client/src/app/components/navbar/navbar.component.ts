import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

    isLoggedIn = false;

    constructor(
        private globalService: GlobalService,
        private authSerive: AuthService) {}

    ngOnInit() {
        this.globalService.isLoggedIn.subscribe(val => {
           this.isLoggedIn = val;
        })
    }

    logout() {
        this.authSerive.logOut();
    }
}