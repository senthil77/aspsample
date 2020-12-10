import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirComponent } from './components/air/air.component';
import { FclComponent } from './components/fcl/fcl.component';
import { LclComponent } from './components/lcl/lcl.component';
import { HomeComponent } from './pages/home/home.component';
import { QuotesComponent } from './pages/quotes/quotes.component';

import { CurrencyMainComponent } from './components/maint/currency-main/currency-main.component';
import { SearchSchedulesComponent } from './pages/search-schedules/search-schedules.component';
import { PackageMainComponent } from './components/maint/package-main/package-main.component';
import { PortMainComponent } from './components/maint/port-main/port-main.component';
 
import { PartnerMainComponent } from './components/maint/partner-main/partner-main.component';
import { ChargeDetailMainComponent } from './components/maint/charge-detail-main/charge-detail-main.component';
import { VesselDetailsComponent } from './components/maint/vessel-details/vessel-details.component';
import { PartnerHomeComponent } from './pages/partner-home/partner-home.component';
import { PartnerAccountComponent } from './pages/partner-account/partner-account.component';

import {DetailedFaresComponent} from './pages/detailed-fares/detailed-fares.component';
import { PortPartnerChargesComponent } from './components/port-partner-charges/port-partner-charges.component';
 
import { VesselOperatorChargesComponent } from './components/vessel-operator-charges/vessel-operator-charges.component';
import { BillOfLandingComponent } from './pages/bill-of-landing/bill-of-landing.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { BolInvoiceComponent } from './pages/bol-invoice/bol-invoice.component';
import { VesselSubscriptionComponent } from './components/vessel-subscription/vessel-subscription.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AccountActivateComponent } from './pages/account-activate/account-activate.component';
import {UserMainComponent} from './components/maint/user-main/user-main.component';
import { PaymentsComponent } from './components/payments/payments.component';
 import {PaymentPageComponent} from './pages/payment-page/payment-page.component';
 import {PaymentStatusComponent} from './pages/payment-status/payment-status.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
   
  { path: 'searchschedule', component: SearchSchedulesComponent,    canActivate: [AuthGuardService] },
 
  { path: 'pack', component: PackageMainComponent, canActivate: [AuthGuardService] },
  { path: 'port', component: PortMainComponent, canActivate: [AuthGuardService] },
 
  { path: 'vesselcharges', component: VesselOperatorChargesComponent, canActivate: [AuthGuardService] },
  { path: 'partner', component: PartnerMainComponent, canActivate: [AuthGuardService] },
  { path: 'currency', component: CurrencyMainComponent,  canActivate: [AuthGuardService] },
  { path: 'chargeDetails', component: ChargeDetailMainComponent,  canActivate: [AuthGuardService]},
  { path: 'vesselDetails', component: VesselDetailsComponent, canActivate: [AuthGuardService] },
  {path: 'account', component:PartnerAccountComponent, canActivate: [AuthGuardService]},
  {path: 'partnerPort', component: PortPartnerChargesComponent},
  {path: 'fares', component: DetailedFaresComponent, canActivate: [AuthGuardService]},
  {path: 'bol', component: BillOfLandingComponent},
  {path:'searchResults', component: SearchItemComponent, canActivate: [AuthGuardService]},
  {path:'invoice', component: BolInvoiceComponent, canActivate: [AuthGuardService]},
  {path:'login', component: LoginPageComponent},
  {path:'signUp', component: SignUpComponent},
  {path:'welcome', component:WelcomePageComponent},
  {path:'activate', component:AccountActivateComponent},
  {path:'user', component:UserMainComponent},
  {path:'subscribe', component: VesselSubscriptionComponent },
  {path:'payment', component: PaymentsComponent },
  {path:'payment-request', component:PaymentPageComponent},
  {path:'Vessel-subscribe', component: SubscribeComponent},
  {path:'partner-home', component:PartnerHomeComponent},
  {path:'pay-status', component:PaymentStatusComponent},
  {
    path: 'quotes',
    component: QuotesComponent,
    canActivate: [AuthGuardService],
        children: [
      { path: '', redirectTo: 'fcl', pathMatch: 'full' },
      { path: 'fcl', component: FclComponent },
      { path: 'lcl', component: LclComponent },
      { path: 'air', component: AirComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:"enabled"})],


  exports: [RouterModule]
})
export class AppRoutingModule { }
