import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private httpClient: HttpClient) { }

    getAllUsers() {
        return this.httpClient.get<[User]>(environment.baseUrl + 'api/users', { headers: this.headers });
    }

    getUserByUsername(username: String): Observable<User> {
        return this.httpClient.get<User>(environment.baseUrl + 'api/users/users/' + username, { headers: this.headers });
    }

    addNewUser(user: User) {
        return this.httpClient.post(environment.baseUrl + 'users', JSON.stringify(user), { headers: this.headers });
    }

    updateUser(user: User){
        console.log(environment.baseUrl + 'users/' + user.username);
        console.log(JSON.stringify(user));
        return this.httpClient.put<User>(environment.baseUrl + 'users/' + user.username, JSON.stringify(user), { headers: this.headers });
    }

    deleteUser(username: string) {
        return this.httpClient.delete(environment.baseUrl + 'users/' + username);
    }
}