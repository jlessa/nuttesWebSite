import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Car } from './car';
import 'rxjs/add/operator/map';

@Injectable()

export class CarService {

    private url = 'assets/cars.json';

    constructor(private http: Http) { }

    getCarsLarge(): Observable<Car[]> {
        return this.http.get(this.url)
            .map((response: Response) => <Car[]>response.json());
    }
}
