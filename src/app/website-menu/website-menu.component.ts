import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'website-menu',
  templateUrl: './website-menu.component.html',
  styleUrls: ['./website-menu.component.css']
})
export class WebsiteMenuComponent {

  constructor(private router: Router) { }


  goHome() {
    this.router.navigate(['']);
  }
  goMeninas() {
    this.router.navigate(['meninas']);
  }
  goPosts() {
    this.router.navigate(['posts']);
  }
  goContato() {
    this.router.navigate(['contato']);
  }
  goAdmin() {
    this.router.navigate(['admin']);
  }

}
