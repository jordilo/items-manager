import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppStoreModule } from '../store/app-store.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentFilterPositionPipe } from './current-filter-position.pipe';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { FavsModalComponent } from './favs-modal/favs-modal.component';
import { FilterItemsComponent } from './filter-items/filter-items.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { MainComponent } from './main/main.component';
import { ScrollDirective } from './scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemsListComponent,
    ItemComponent,
    MainComponent,
    ScrollDirective,
    FavsModalComponent,
    FilterItemsComponent,
    CurrentFilterPositionPipe,
    FavoriteButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppStoreModule,
    ModalModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
registerLocaleData(localeEs, 'es', localeEsExtra);
