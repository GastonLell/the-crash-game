import { Component, OnInit } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { DataChart, GamesPlayed } from 'src/app/core/interface/GamesPlayed';
import { CrashService } from 'src/app/core/services/crash.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public amountTotal$: Observable<number> = of(0);
  public dataChart: DataChart[] = []
  public gamesPlayed: GamesPlayed[] = []

  constructor(private walletService: WalletService, private crashService: CrashService) { }

  ngOnInit(): void {
    this.amountTotal$ = this.walletService.walletAmount;
    // this.newPlayed();
  }

  public setPlayed(played: GamesPlayed){
    this.gamesPlayed = [...this.gamesPlayed, played]
  }

  public newPlayed(){
    let numAux = 0;
    this.crashService.newGame()
  }

}
