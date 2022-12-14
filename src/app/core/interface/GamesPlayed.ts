export interface GamePlayed {
  iBet: boolean,
  isWinner: boolean,
  betAmount: number,
  result: number,
  crashIn: number | undefined,
  date: Date;
}
export interface DataChart {
  value: number,
  name: string
}

export interface NumberRepetitions{
  repetitions: number,
  timer: number,
  lastResults: null | DataChart
}
