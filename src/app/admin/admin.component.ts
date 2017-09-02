import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Menu } from 'primeng/components/menu/menu';
import { MenuModule, MenuItem } from 'primeng/primeng';



declare var jQuery: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];

  @ViewChild('bigMenu') bigMenu: Menu;

  constructor() { }

  ngOnInit() {

    // tslint:disable-next-line:prefer-const
    let handleSelected = function (event) {
      const allMenus = jQuery(event.originalEvent.target).closest('ul');
      const allLinks = allMenus.find('.menu-selected');

      // tslint:disable-next-line:quotemark
      allLinks.removeClass("menu-selected");
      const selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
    };

    this.items = [
      { label: 'Dashboard', icon: 'fa-home', routerLink: [''] },
      { label: 'Modelos', icon: 'fa-pencil', routerLink: [''] },
      { label: 'Perfis', icon: 'fa-users', routerLink: [''] },
      { label: 'Mensagens', icon: 'fa-envelope-o', routerLink: [''] },
      { label: 'Profile', icon: 'fa-user', routerLink: [''] },
      { label: 'Sair', icon: 'fa-sign-out', routerLink: [''] }
    ];

  }

}
