import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataChart, GamePlayed } from 'src/app/core/interface/GamesPlayed';
import { CrashService } from 'src/app/core/services/crash.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {
  public betAmount: number = 0;
  public dataCrash$: Observable<DataChart[]> = this.crashService.dataCrash$.asObservable()
  public gamesPlayed: Observable<GamePlayed[]> = this.crashService.gamesPlayed$.asObservable();
  public gameInProgress$: Observable<boolean> = this.crashService.gameInProgress$.asObservable()

  get currentBetAmount(): number{
    return this.walletService.betAmount
  }
  get activateBet(): boolean {
    return this.crashService.activateBet$.getValue();
  }

  constructor(private crashService: CrashService, private walletService: WalletService) { }

  ngOnInit(): void {}

  public setBetsAmount(){
    this.walletService.setBetAmount(this.betAmount);
    this.crashService.setActivateBet(true)
  }
}
