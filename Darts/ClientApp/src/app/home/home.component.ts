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
    console.log(newThrow)

    let throwValue: number = 0;

    if(newThrow !== "MISS" && newThrow !== "SBACK") throwValue = parseInt(newThrow.substring(1))
    let double: boolean = false;
    let treble: boolean = false;
    let back: boolean = false;

    if(newThrow.charAt(0) == "D") double = true;
    if(newThrow.charAt(0) == "T") treble = true;

    if(newThrow !== "SBACK"){
      this.legResult.push(newThrow);
    }

    console.log(this.legResult)

    this.players$.subscribe(players =>
    {
      players.some(
        player => {

        if(newThrow === "SBACK" && player.score < 501 && this.legResult.length > 0){
          player.score += parseInt(this.legResult[this.legResult.length-1].substring(1));
          this.legResult.pop();
          back = true;
        }
        if (player.id == this.currentPlayerId && !back) {

          if(double) throwValue = throwValue * 2;
          if(treble) throwValue = throwValue * 3;

          player.score -= throwValue;
          if(this.legResult.length == 3) {
            player.legResult.push(this.legResult);
          }
        }
        back = false;
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
