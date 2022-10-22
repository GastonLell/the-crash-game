import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']
})
export class ConfigurationPageComponent  {
  public name: string = ''
  constructor(private router: Router) { }

  public goTo(path: string): void {


    if(this.name.trim().length > 0) {
      localStorage.setItem('name', this.name.trim());
    } else {
      localStorage.setItem('name', 'player1');
    }

    this.router.navigateByUrl(path)
  }


}
