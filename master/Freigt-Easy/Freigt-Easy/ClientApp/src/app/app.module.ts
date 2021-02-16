import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { AirComponent } from './components/air/air.component';
import { FclComponent } from './components/fcl/fcl.component';
import { LclComponent } from './components/lcl/lcl.component';
import { SearchSchedulesComponent } from './pages/search-schedules/search-schedules.component';
import { ChargeDetailMainComponent } from './components/maint/charge-detail-main/charge-detail-main.component';
import { CurrencyMainComponent } from './components/maint/currency-main/currency-main.component';
import { PackageMainComponent } from './components/maint/package-main/package-main.component';
import { PartnerMainComponent } from './components/maint/partner-main/partner-main.component';
import { PortMainComponent } from './components/maint/port-main/port-main.component';
import { PortPartnerChargesComponent } from './components/port-partner-charges/port-partner-charges.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { SearchScheduleListComponent } from './components/search-schedule-list/search-schedule-list.component';
import { VesselOperatorChargesComponent } from './components/vessel-operator-charges/vessel-operator-charges.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { VesselDetailsComponent } from './components/maint/vessel-details/vessel-details.component';
import { ApiClientService } from './services/api-client.service';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { PartnerHomeComponent } from './pages/partner-home/partner-home.component';
import { PartnerAccountComponent } from './pages/partner-account/partner-account.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { DetailedFaresComponent } from './pages/detailed-fares/detailed-fares.component';
import { CancelRefundComponent } from './components/cancel-refund/cancel-refund.component';
import { CurrentOrderComponent } from './components/current-order/current-order.component';
import { BillOfLandingComponent } from './pages/bill-of-landing/bill-of-landing.component';
import { BolInvoiceComponent } from './pages/bol-invoice/bol-invoice.component';
import { VesselSubscriptionComponent } from './components/vessel-subscription/vessel-subscription.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DatePipe } from '@angular/common';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AccountActivateComponent } from './pages/account-activate/account-activate.component';
import { FilterNestedPipe } from './pipes/order-by.pipe';
import {AuthInterceptor} from './services/auth-interceptor';
import { UserMainComponent } from './components/maint/user-main/user-main.component';
 
import { SummaryComponent } from './components/summary/summary.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { CurrencyPipe } from '@angular/common';
import { PaymentStatusComponent } from './pages/payment-status/payment-status.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
 
    AirComponent,
    FclComponent,
    LclComponent,
    SearchSchedulesComponent,
    ChargeDetailMainComponent,
    CurrencyMainComponent,
    PackageMainComponent,
    PartnerMainComponent,
    PortMainComponent,
    PortPartnerChargesComponent,
    SearchItemComponent,
    SearchScheduleListComponent,
 
    SortByPipe,
   
    PartnerMainComponent,
    VesselOperatorChargesComponent,
    FilterPipe,
    ChargeDetailMainComponent, SearchItemComponent, SearchScheduleListComponent, PortPartnerChargesComponent,
    HomeComponent,
    VesselDetailsComponent,
    QuotesComponent,
    PartnerHomeComponent,
    PartnerAccountComponent,
  
    DetailedFaresComponent,
  
    CancelRefundComponent,
  
    CurrentOrderComponent,
  
    BillOfLandingComponent,
  
    BolInvoiceComponent,
  
    VesselSubscriptionComponent,
  
    SubscribeComponent,
  
    LoginPageComponent,
  
    SignUpComponent,
  
    WelcomePageComponent,
  
    AccountActivateComponent,
  
    FilterNestedPipe,
  
    UserMainComponent,
  
   
  
    SummaryComponent,
  
    PaymentPageComponent,
  
    PaymentsComponent,
  
    PaymentStatusComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AutocompleteLibModule
  
  ],
  providers: [ApiClientService,FilterPipe,CurrencyPipe, DatePipe,FilterNestedPipe,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
