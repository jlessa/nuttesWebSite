import { AdminComponent } from './admin/admin.component';
import { AppPostsComponent } from './app-posts/app-posts.component';
import { ContatoComponent } from './contato/contato.component';
import { ModuleWithProviders } from '@angular/core';
import { PageNotFoundComponent } from './pageNotFound.component';
import { MeninasComponent } from './meninas/meninas.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule, } from '@angular/router';


export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'meninas', component: MeninasComponent },
    { path: 'admin', component: AdminComponent, pathMatch: 'full' },
    { path: 'posts', component: AppPostsComponent },
    { path: 'contato', component: ContatoComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
