import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedList } from './bed-list';

describe('BedList', () => {
  let component: BedList;
  let fixture: ComponentFixture<BedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedList],
    }).compileComponents();

    fixture = TestBed.createComponent(BedList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
