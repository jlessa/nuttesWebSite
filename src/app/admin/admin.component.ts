import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Menu } from 'primeng/components/menu/menu';
import { MenuModule, MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];
  isMenuHidden = true;
  menuHideClass = '';
  @ViewChild('bigMenu') bigMenu: Menu;

  constructor(private router: Router) { }

  hideMenu() {
    this.isMenuHidden = this.isMenuHidden === true ? false : true;
  }

  ngOnInit() {


    this.items = [
      { label: 'Dashboard', icon: 'fa-home', command: () => { this.router.navigate(['admin/dashboard']); } },
      { label: 'Modelos', icon: 'fa-pencil', command: () => { this.router.navigate(['admin/modelo']); } },
      { label: 'Perfis', icon: 'fa-users', command: () => { this.router.navigate(['admin/perfil']); } },
      { label: 'Mensagens', icon: 'fa-envelope-o', command: () => { this.router.navigate(['admin/mensagem']); } },
      { label: 'Galeria', icon: 'fa-camera', command: () => { this.router.navigate(['admin/galeria']); } },
      { label: 'Sair', icon: 'fa-sign-out', routerLink: [''] }
    ];

  }

}
