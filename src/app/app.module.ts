import { PerfilComponent } from './admin/perfil-admin/perfil.component';
import { GaleriaComponent } from './admin/galeria-admin/galeria.component';
import { UserService } from './admin/perfil-admin/user.service';
import { HttpModule } from '@angular/http';
import { CarService } from './admin/modelos-admin/car-service';
import { ModelosAdminComponent } from './admin/modelos-admin/modelos-admin.component';
import { DashboardComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { StatisticComponent } from './admin/statistic-component/statistic.component';
import { importPrimeNg } from './admin/primeNg.config';
import { AdminComponent } from './admin/admin.component';
import { IonicAppService } from './services/ionic-app.service';
import { routes } from './app.routes';
import { PageNotFoundComponent } from './pageNotFound.component';
import { MeninasComponent } from './meninas/meninas.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContatoComponent } from './contato/contato.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { AppPostsComponent } from './app-posts/app-posts.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WebsiteMenuComponent } from './website-menu/website-menu.component';
import { WebsiteFooterComponent } from './website-footer/website-footer.component';
import { MenuModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MeninasComponent,
    PageNotFoundComponent,
    HomeComponent,
    ContatoComponent,
    AppPostsComponent,
    AdminComponent,
    WebsiteMenuComponent,
    WebsiteFooterComponent,
    StatisticComponent,
    PerfilComponent,
    DashboardComponent,
    ModelosAdminComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    routes,
    NgxGalleryModule,
    InfiniteScrollModule,
    importPrimeNg
  ],
  exports: [
    RouterModule
  ],
  providers: [
    IonicAppService,
    CarService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
