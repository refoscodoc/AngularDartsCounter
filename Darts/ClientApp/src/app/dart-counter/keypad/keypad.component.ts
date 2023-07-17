import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent {
  @Output() selection: any = new EventEmitter<string>();
  double: boolean = false;
  treble: boolean = false;
  dart: number = 0;
  dBtnColour= 'red';
  tBtnColour= 'red';

  sendSelection(throwResult: any): void{
      if(throwResult === "BACK"){
        this.restorePrevious();
      }

      if(throwResult === 'MISS'){
        this.selection.emit("MISS");
        return;
      }

      if(this.double) {
        this.selection.emit("D" + throwResult);
        this.double = false;
        this.dBtnColour = 'red';
        return;
      }
      if(this.treble) {
        this.selection.emit("T" + throwResult);
        this.treble = false;
        this.tBtnColour = 'red';
        return
      }

      this.dart++;
      this.selection.emit("S" + throwResult);
  }

  restorePrevious(): void{
    // TODO
  }

  turnManager(throwResult: string): void{
    if(this.dart == 0 && throwResult === "BACK"){
      this.selection.emit("BACK");
    }

    this.sendSelection(throwResult);

    // after the selection it check and advances automatically
    if(this.dart == 3) {
      // TODO send next player input
    }
  }

  changeDouble() {
    if(this.treble) {
      this.treble = false;
      this.tBtnColour = 'red'
    }
    this.double = !this.double;
    if(this.double) this.dBtnColour = 'green';
    if(!this.double) this.dBtnColour = 'red';
    console.log(this.double);
  }
  changeTriple() {
    if(this.double) {
      this.double = false;
      this.dBtnColour = 'red'
    }
    this.treble = !this.treble;
    if(this.treble) this.tBtnColour = 'green';
    if(!this.treble) this.tBtnColour = 'red';
    console.log(this.treble);
  }
}
