import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, of, take } from 'rxjs';
import { DataChart } from '../interface/GamesPlayed';

@Injectable({
  providedIn: 'root',
})
export class CrashService {
  private dataCrash: BehaviorSubject<DataChart[]> = new BehaviorSubject<
    DataChart[]
  >([
    { name: '0', value: 1 },
    { name: '1', value: 10 },
  ]);

  public newGame() {
    let numAux: number = 0;
    return interval(1000).pipe(
      take(10),
      map((timer: number) => {
        return {
          "value": numAux += Math.random(),
          "name": timer.toString()
        }

      })
    );
  }
  constructor() {}
}
