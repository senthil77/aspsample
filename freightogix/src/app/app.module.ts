import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { DatePipe } from '@angular/common';
import { FilterNestedPipe } from './pipes/order-by.pipe';
import {AuthInterceptor} from './services/auth-interceptor';
 import {SharedModule} from './shared/shared/shared.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CurrencyPipe } from '@angular/common';
import { ApiClientService } from './services/api-client.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ChargeDetailsComponent } from './components/maint/charge-details/charge-details.component';
import { DialogBoxComponent } from './components/shared/dialog-box/dialog-box.component';
import { FileNameDialogComponent } from './pages/home/EditUser';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';
@NgModule({
  declarations: [
    AppComponent,
    SortByPipe,
    FilterPipe,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChargeDetailsComponent,
    DialogBoxComponent,
    FileNameDialogComponent,
    WelcomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule, 
    MatCarouselModule.forRoot(),
  ],
  providers: [ApiClientService,FilterPipe,CurrencyPipe, DatePipe,FilterNestedPipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [FileNameDialogComponent]
 ,
})
export class AppModule { }
