import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class GlobalService {
    isLoggedIn = new BehaviorSubject(false);

    setLogin(val) {
        this.isLoggedIn.next(val);
    }
}