import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import {
  BehaviorSubject,
  interval,
  Subject,
  Subscription,
  take,
  takeUntil,
} from 'rxjs';
import {
  DataChart,
  GamePlayed,
  NumberRepetitions,
} from '../interface/GamesPlayed';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root',
})
export class CrashService {
  // configuration variables
  private subscription!: Subscription;
  private subscriptionTimer!: Subscription;
  public timer$: BehaviorSubject<number> = new  BehaviorSubject<number>(5)

  public gameInProgress$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public activateBet$: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);
  // public timer
  public dataCrash$: BehaviorSubject<DataChart[]> = new BehaviorSubject<
    DataChart[]
  >([]);

  public gamesPlayed$: BehaviorSubject<GamePlayed[]> = new BehaviorSubject<
    GamePlayed[]
  >([]);

  public repetitionsNumber$: BehaviorSubject<NumberRepetitions> =
    new BehaviorSubject<NumberRepetitions>({
      repetitions: 1,
      timer: 0,
      lastResults: null,
    });

  // set init game
  public setGameInProgress(inProgress: boolean) {
    this.gameInProgress$.next(inProgress);
  }

  public setActivateBet(active: boolean){
    this.activateBet$.next(active);
  }

  public setGamesPlayed(newGamePlayed: GamePlayed) {
    this.gamesPlayed$.next([...this.gamesPlayed$.getValue(), newGamePlayed]);
  }

  public newGame() {
    if(this.activateBet$.getValue()){
      this.walletService.subtractBet();
    }

    this.dataCrash$.next([]);
    this.setGameInProgress(true);
    let numAux: number = 0;
    let repetitions: number = this.generateRandomNumber(3, 10);

    this.subscription = interval(1000)
      .pipe(take(repetitions))
      .subscribe({
        next: (timer: number) => {
          if (this.gameInProgress$.getValue()) {
            console.log(timer);
            let data: DataChart = {
              value: (numAux += Math.random()),
              name: timer.toString(),
            };
            this.dataCrash$.next([...this.dataCrash$.getValue(), data]);

            this.repetitionsNumber$.next({
              repetitions,
              timer: timer + 1,
              lastResults: data,
            });
          }
        },
        error: (error) => {
          console.error('Error al cargar grafico', error);
        },
        complete: () => {
          this.setGameInProgress(false);
          this.setActivateBet(false)

          this.bettingTime();
        },
      });
    return this.subscription;
  }

  // withdraw the game
  public backingOut() {
    this.subscription.unsubscribe();
    this.setGameInProgress(false);
    this.setActivateBet(false)

    this.bettingTime();
  }

  public backingOutGame() {
    if(this.subscription !== undefined){
      this.subscription.unsubscribe();
    }
    if(this.subscriptionTimer !== undefined){
      this.subscriptionTimer.unsubscribe();
    }
  }
  // start game after 5 seconds
  public bettingTime() {
    this.subscriptionTimer = interval(1000)
      .pipe(take(5))
      .subscribe({
        next: (time) => {
          this.timer$.next(5 - (time + 1))
          console.log(`${time + 1} segundos para retomar el juego`);
        },
        error: (error) =>
          console.error('Error en contador BETTING TIME', error),
        complete: () => this.newGame(),
      });
    return this.subscription;
  }

  // utilities
  public generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor(private walletService: WalletService) {}
}
