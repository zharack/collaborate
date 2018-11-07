import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

export class UserModel {
    username: string;
    password: string;
    name: string;
    email: string;

    constructor(username, name, email) {
        this.username = username;
        this.name = name;
        this.email = email;
    }
}

@Injectable()
export class OauthService {
    private user: UserModel;

    constructor(private _http: HttpClient) {

    }

    login(user: UserModel) {
        if (user.username && user.password) {
            return this._http.get('https://jsonplaceholder.typicode.com/users/1').pipe(
                map(
                    (map: any) => {
                        return Observable.create(
                            (obs) => {
                                setTimeout(
                                    () => {
                                        const userService: UserModel = new UserModel(map.username, map.name, map.email);
                                        this.user = userService;
                                        return true;
                                    }, 
                                    4000
                                );
                            }
                        );
                    }
                )
        )
        } else {
            return Observable.throw(false);
        }
    }

    logout(): void {
        this.user = null
    }

    getUserData(): UserModel {
        return new UserModel(this.user.username, this.user.name, this.user.email);
    }
}