import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// APP
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// PAGES
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DepositPageComponent } from './pages/deposit-page/deposit-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';

// CUSTOM MODULES
import { SharedModule } from './modules/shared/shared.module';
import { WalletService } from './core/services/wallet.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfilePageComponent,
    WelcomePageComponent,
    DepositPageComponent,
    ConfigurationPageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    // CUSTOM MODULES
    SharedModule
  ],
  providers: [WalletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
