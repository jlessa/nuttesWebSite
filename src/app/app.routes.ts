import { GaleriaComponent } from './admin/galeria-admin/galeria.component';
import { ModelosAdminComponent } from './admin/modelos-admin/modelos-admin.component';
import { DashboardComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { PerfilComponent } from './admin/perfil-admin/perfil.component';
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
    { path: 'admin', component: DashboardComponent },
    { path: 'admin/dashboard', component: DashboardComponent },
    { path: 'admin/modelo', component: ModelosAdminComponent },
    { path: 'admin/perfil', component: PerfilComponent },
    { path: 'admin/mensagem', component: AdminComponent },
    { path: 'admin/galeria', component: GaleriaComponent },
    { path: 'posts', component: AppPostsComponent },
    { path: 'contato', component: ContatoComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
