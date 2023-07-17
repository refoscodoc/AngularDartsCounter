import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBoxComponent } from './player-box.component';

describe('PlayerBoxComponent', () => {
  let component: PlayerBoxComponent;
  let fixture: ComponentFixture<PlayerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
