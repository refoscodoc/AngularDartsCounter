import {Component, Input} from '@angular/core';
import {Player} from "../../interfaces/Player";
import {GameStats} from "../../interfaces/GameStats";

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.css'],
})
export class PlayerBoxComponent {
  @Input() player: Player;
  progress: number = 0;
  @Input()
  gameHasStarted: boolean;
  displayedColumns: string[] = ['date', 'threeDartAvg', 'firstNine', 'highestScore'];
  dataSource: GameStats[];
  isCurrent: boolean = false;
}
