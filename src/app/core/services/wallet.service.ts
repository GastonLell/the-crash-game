import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private _walletAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public walletAmount: Observable<number> = this._walletAmount.asObservable();

  public depositMoney(moneyIncome: number){
    let amount = this._walletAmount.getValue() + moneyIncome;

    this._walletAmount.next(amount);

  }

  public toTakeMoneyOut(takeMoney: number){
    let amount = this._walletAmount.getValue() - takeMoney;

    this._walletAmount.next(amount);
  }

  constructor() { }
}
