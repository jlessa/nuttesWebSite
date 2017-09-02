import { Component, OnInit } from '@angular/core';

@Component({
    template: '<h1>Page Not Found</h1><router-outlet></router-outlet>'
})
export class PageNotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
