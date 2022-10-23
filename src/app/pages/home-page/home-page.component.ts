import { Component, OnDestroy, OnInit } from '@angular/core';
import {  BehaviorSubject, Observable, of, share } from 'rxjs';
import { DataChart, GamePlayed, NumberRepetitions } from 'src/app/core/interface/GamesPlayed';
import { CrashService } from 'src/app/core/services/crash.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  private _lastResult: BehaviorSubject<DataChart | null> = new BehaviorSubject<DataChart | null>(null);

  public dataChart: DataChart[] = [];
  public gamesPlayed: Observable<GamePlayed[]> = this.crashService.gamesPlayed$.asObservable().pipe(share());
  public gameInProgress: Observable<boolean> = this.crashService.gameInProgress$.asObservable().pipe(share());
  public timer: Observable<number> = this.crashService.timer$.asObservable().pipe(share());

  // getters
  get lastResult(): DataChart | null{
    return this._lastResult.getValue()
  }
  get activateBet(): boolean {
    return this.crashService.activateBet$.getValue();
  }
  constructor(private walletService: WalletService, private crashService: CrashService) { }


  ngOnInit(): void {
    this.getRepetitions();
    this.newPlayed();
  }

  ngOnDestroy(): void {
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
    this._lastResult.next(currentPlay.lastResults)

    let result = currentPlay.lastResults?.value! * this.walletService.betAmount;
    let betAmount = this.walletService.betAmount;
    let crashIn = currentPlay.lastResults?.value
    let iBet = this.activateBet;
    this.setPlayed({
      iBet,
      isWinner: true,
      betAmount,
      result,
      crashIn
    })
    this.crashService.backingOut();

  }
  public gameOver(){
    this.crashService.backingOutGame()
  }

  public getRepetitions(){
    this.crashService.repetitionsNumber$.subscribe((resp: NumberRepetitions) => {
      if(resp.timer === 0) return;

      if(resp.repetitions === resp.timer){
        this._lastResult.next(resp.lastResults)

        let currentPlay = this.crashService.repetitionsNumber$.getValue()

        let result = (-this.walletService.betAmount);
        let betAmount = this.walletService.betAmount;
        let crashIn = currentPlay.lastResults?.value
        let iBet = this.activateBet;
        this.setPlayed({
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

}
