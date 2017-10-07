import { Observable } from 'rxjs/Rx';
import { User } from '../../model/user';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {

    private url = 'https://ionic-app-b34ac.firebaseio.com/';

    constructor(private http: Http) { }

    getUser(): Observable<User[]> {
        return this.http.get(this.url)
            .map((response: Response) => <User[]>response.json());
    }

}
