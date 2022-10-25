import { Component, OnDestroy, OnInit } from '@angular/core';
import {  BehaviorSubject, map, Observable, of, share, Subject, takeUntil } from 'rxjs';
import { DataChart, GamePlayed, NumberRepetitions } from 'src/app/core/interface/GamesPlayed';
import { CrashService } from 'src/app/core/services/crash.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  userName: null| string = 'Player 1';

  private destroy: Subject<void> = new Subject()
  public lastResult: DataChart | null = null
  public dataChart: DataChart[] = [];
  public gamesPlayed: GamePlayed[] = []
  public gameInProgress: Observable<boolean> = this.crashService.gameInProgress$.asObservable().pipe(share());
  public timer: Observable<number> = this.crashService.timer$.asObservable().pipe(share());
  public isMaxBet: number = 0;
  public isMaxProfit: number = 0;


  get activateBet(): boolean {
    return this.crashService.activateBet$.getValue();
  }

  constructor(private walletService: WalletService, private crashService: CrashService) {
    if(localStorage.getItem('name')){
      this.userName = localStorage.getItem('name')
    }
  }


  ngOnInit(): void {
    this.getRepetitions();
    this.newPlayed();
    this.getGamesPlayed();
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.gameOver();
  }

  public setPlayed(played: GamePlayed){
    this.crashService.setGamesPlayed(played)
  }

  public newPlayed(){
    this.crashService.newGame()
  }

  public backingOut(){
    let currentPlay = this.crashService.repetitionsNumber$.getValue()
    this.lastResult = currentPlay.lastResults

    let betAmount = this.walletService.betAmount;
    let result = currentPlay.lastResults?.value! * this.walletService.betAmount
    let crashIn = currentPlay.lastResults?.value
    let iBet = this.activateBet;
    let date = new Date();
    this.setPlayed({
      date,
      iBet,
      isWinner: true,
      betAmount,
      result,
      crashIn
    })
    this.walletService.depositMoney(result)
    this.crashService.backingOut();
  }

  public gameOver(){
    this.crashService.backingOutGame()
  }

  public getRepetitions(){
    this.crashService.repetitionsNumber$.pipe(takeUntil(this.destroy)).subscribe((resp: NumberRepetitions) => {
      if(resp.timer === 0) return;

      if(resp.repetitions === resp.timer){
        this.lastResult = resp.lastResults

        let currentPlay = this.crashService.repetitionsNumber$.getValue()

        let result = this.activateBet ? (-this.walletService.betAmount) : 0;
        let betAmount = this.walletService.betAmount;
        let crashIn = currentPlay.lastResults?.value
        let iBet = this.activateBet;
        let date = new Date();
        this.setPlayed({

          date,
          iBet,
          isWinner: false,
          betAmount,
          result,
          crashIn
        })
        this.crashService.setGameInProgress(false)
      }
    })
  }
  getGamesPlayed(){
    this.crashService.gamesPlayed$.pipe(takeUntil(this.destroy)).subscribe(resp => {
      this.gamesPlayed = resp.slice(-7);
      this.isMaxBet = resp.sort((a, b) => b.betAmount - a.betAmount )[0]?.betAmount || 0;
      this.isMaxProfit = resp.sort((a, b) => b.result - a.result )[0]?.result || 0;
    })

  }

}
