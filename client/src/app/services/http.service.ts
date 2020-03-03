import { HttpClient } from '@angular/common/http';

export class HttpService {

    private url = 'http://localhost:9999/';
    constructor(public http: HttpClient) {}

    get(path) {
        return this.http.get(`${this.url}${path}`)
    }

    getOne(path, id) {
        return this.http.get(`${this.url}${path}/${id}`);
    }

    post(path, data) {
        return this.http.post(`${this.url}${path}`, data);
    }

    update(path, data) {
        return this.http.post(`${this.url}${path}`, data);
    }

    delete(path, id) {
        this.http.delete(`${this.url}${path}/${id}`);
    }
}