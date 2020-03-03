import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService extends HttpService {
    constructor(public http: HttpClient) {
        super(http);
    }

    login(data) {
        return this.post('login', data);
    }
}