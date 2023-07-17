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
      console.log(this.playerNum)
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
    console.log(this.players$)
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

    if(this.currentPlayerId > (this.playerNum - 1)){
      this.currentPlayerId = 0;
    }

    this.legResult.push(newThrow);

    this.players$.subscribe(players => {
      players.map(player => {
        if (player.id === this.currentPlayerId) {
          console.log(player.score + " " + throwValue)
          player.score -= throwValue;
          if(this.legResult.length <= 2) {
            player.legResult.push(this.legResult);
            this.legResult = [];
          }
          console.log(player.score);
          console.log(player.id);
          console.log(this.currentPlayerId);
        }
      })
    })
  }
}
