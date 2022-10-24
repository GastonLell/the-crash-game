import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrls: ['./deposit-page.component.scss']
})
export class DepositPageComponent {
  public amount: number = 0;

  public isMin: boolean = false;

  constructor(private walletService: WalletService) { }

  setAmount(amount: number){
    if(!this.isMin) {
      this.walletService.depositMoney(amount)
    }
  }
  checkAmount(event$: number): void{
    this.isMin = event$ < 100;
  }
}
