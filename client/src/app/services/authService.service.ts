import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private httpClient: HttpClient) { }

    async login(username: string, password: string) {
        await this.httpClient.post(environment.baseUrl + 'api/users/login', JSON.stringify({username: username, password: password}), { headers: this.headers }).subscribe(result => { console.log(result); });
        localStorage.setItem('user', username);
    }

    logout() {
        this.httpClient.post(environment.baseUrl + 'api/users/logout', { headers: this.headers }).subscribe(result => { console.log(result); });
        localStorage.clear();
    }

    register(username: string, password: string, birthDate: string) {
        this.httpClient.post(environment.baseUrl + 'api/users/register', JSON.stringify({username: username, password: password, accessLevel: 1, birthdate: birthDate}), { headers: this.headers }).subscribe(result => { console.log(result); });
        localStorage.setItem('user', username);
    }
}