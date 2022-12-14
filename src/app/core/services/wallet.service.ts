import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private _walletAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public walletAmount$: Observable<number> = this._walletAmount$.asObservable();
  public insufficientFunds: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);

  private _betAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // public betAmount$: Observable<number> = this._betAmount$.asObservable();

  get betAmount(): number {
    return this._betAmount$.getValue()
  }

  public depositMoney(moneyIncome: number){
    let amount = this._walletAmount$.getValue() + moneyIncome;
    this._walletAmount$.next(amount);
  }


  public setBetAmount(bet: number){
    this._betAmount$.next(bet);
  }

  public subtractBet(){
      this._walletAmount$.next(this._walletAmount$.getValue() - this.betAmount)
  }

  public checkAmount(amount?: number): boolean{

    if(this._walletAmount$.getValue() == 0){
      this.insufficientFunds.next(true)
      return false;
    }
    if(amount){
      if(this._walletAmount$.getValue() - amount < 0){
        this.insufficientFunds.next(true)
        return false;
      }
    }
    this.insufficientFunds.next(false)
    return true;
  }
  constructor() { }
}
