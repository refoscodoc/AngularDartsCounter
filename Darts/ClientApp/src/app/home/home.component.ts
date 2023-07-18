import { Component } from '@angular/core';
import {Player} from "../interfaces/Player";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {TurnInfo} from "../interfaces/TurnInfo";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  id: number = 0;
  private playerSubject = new BehaviorSubject<Player[]>([{
    id: this.id,
    name: "",
    score: 501,
    legResult: [],
    isCurrent: true
  }])
  players$: Observable<Player[]>;
  playerNum: number = 1;

  legResult: string[] = [];

  currentPlayerId: number = 0;

  gameHasStarted: boolean = false;

  increment(): void{
    this.id++;
    if(this.playerNum < 4){
      this.playerNum += 1;
      this.players$.pipe(tap(players => {
        players.push({
          id: this.id,
          name: "",
          score: 501,
          legResult: [],
          isCurrent: false
        })
      })).subscribe();
    }
  }
  decrement(): void{
    this.id--;
    if(this.playerNum > 1){
      this.playerNum -= 1;
      this.players$.pipe(tap(players => {
        players.pop()
      })).subscribe()
    }
  }

  ngOnInit() {
    this.players$ = this.playerSubject
  }

  startGame(){
    this.gameHasStarted = true;
  }

  stopGame(){
    this.gameHasStarted = false;
  }

  addThrow(newThrow: string): void{

    let throwValue: number = 0;

    if(newThrow !== "MISS") throwValue = parseInt(newThrow.substring(1))
    let double: boolean = false;
    let treble: boolean = false;

    if(newThrow.charAt(0) == "D") double = true;
    if(newThrow.charAt(0) == "T") treble = true;

    console.log("multiplier : " + newThrow.charAt(0))

    this.legResult.push(newThrow);

    this.players$.subscribe(players =>
    {
      // try to break here, before the next iteration - maybe i'm wrong
      players.some(
        player => {
        console.log("PlayerId " + player.id)
        console.log("CurrentPlayerId " + this.currentPlayerId)
        if (player.id == this.currentPlayerId) {
          // console.log(this.currentPlayerId)
          // console.log(this.legResult)

          if(double) throwValue = throwValue * 2;
          if(treble) throwValue = throwValue * 3;

          player.score -= throwValue;
          if(this.legResult.length == 3) {
            player.legResult.push(this.legResult);
            console.log("this.legResult.length 3 long")
            console.log(this.currentPlayerId)
            console.log(this.playerNum)
            // if(this.currentPlayerId+1 == this.playerNum) {
            //   this.currentPlayerId = 0;
            // } else {
            //   this.currentPlayerId = this.currentPlayerId + 1;
            // }
            // this.legResult = [];
            // if(this.currentPlayerId > (this.playerNum - 1)){
            //   this.currentPlayerId = 0;
            // }
          }
        }
      })
    })
    if(this.legResult.length == 3){
      if(this.currentPlayerId+1 == this.playerNum) {
        this.currentPlayerId = 0;
        this.legResult = [];
      } else {
        this.currentPlayerId = this.currentPlayerId + 1;
        this.legResult = [];
      }
    }
  }
}
