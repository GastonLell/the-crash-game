import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrls: ['./deposit-page.component.scss']
})
export class DepositPageComponent implements OnInit {
  public amount: number = 0;
  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
  }

  setAmount(amount: number){
    this.walletService.depositMoney(amount)
  }
}
