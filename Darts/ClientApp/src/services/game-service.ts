import { Injectable } from  '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Player} from "../app/interfaces/Player";

@Injectable({
  providedIn:  'root'
})
export class GameService {

  players: Player[];

  constructor(private http: HttpClient) { }

}

// TODO this will be added once the game is working
