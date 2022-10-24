import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Observable, share, Subject, takeUntil } from 'rxjs';
import { DataChart, GamePlayed } from 'src/app/core/interface/GamesPlayed';
import { CrashService } from 'src/app/core/services/crash.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public betAmount: number = 0;
  public generalAmount: number = 0;
  public dataCrash$: Observable<DataChart[]> = this.crashService.dataCrash$.pipe(share())
  public gamesPlayed$: Observable<GamePlayed[]> = this.crashService.gamesPlayed$.pipe(share());
  public gameInProgress$: Observable<boolean> = this.crashService.gameInProgress$.pipe(share())

  public amountIsZero: boolean = false;
  public insufficientFunds: boolean = false;
  public minError: boolean = false;

  get currentBetAmount(): number{
    return this.walletService.betAmount
  }
  get activateBet(): boolean {
    return this.crashService.activateBet$.getValue();
  }

  constructor(private crashService: CrashService, private walletService: WalletService) { }


  ngOnInit(): void {
    this.checkAmounts()
    this.insufficientFunds = this.generalAmount < this.betAmount

    this.gamesPlayed$.subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public setBetsAmount(): void{
    this.walletService.setBetAmount(this.betAmount);
    this.crashService.setActivateBet(true)
    this.betAmount = 0;
  }

  public setBetAmount($event: number) {
    if($event < 50) {
      this.minError = true;
    } else {
      this.minError = false;
    }

    if(this.generalAmount < $event){
      this.insufficientFunds = true;
    } else {
      this.insufficientFunds = false;
    }
  }

  private checkAmounts(){
    this.walletService.walletAmount$.pipe(takeUntil(this.destroy$)).subscribe(amount => {
      this.generalAmount = amount;

      if(amount === 0){
        this.amountIsZero = true;
      } else{
        this.amountIsZero = false;
      }

      if(amount - this.betAmount < 0) {
        this.insufficientFunds = true
      }

    })
  }

}
