import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { DepositPageComponent } from './pages/deposit-page/deposit-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'configuration',
    component: ConfigurationPageComponent,
  },
  {
    path: 'deposit',
    component: DepositPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
