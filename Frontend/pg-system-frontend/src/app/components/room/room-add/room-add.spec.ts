import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAdd } from './room-add';

describe('RoomAdd', () => {
  let component: RoomAdd;
  let fixture: ComponentFixture<RoomAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
