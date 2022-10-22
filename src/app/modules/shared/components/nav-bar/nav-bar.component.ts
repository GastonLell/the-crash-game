import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public amountTotal: Observable<number> = of(0);

  constructor(private walletService: WalletService) {
  }
  ngOnInit(): void {
   this.amountTotal = this.walletService.walletAmount;
  }

}
