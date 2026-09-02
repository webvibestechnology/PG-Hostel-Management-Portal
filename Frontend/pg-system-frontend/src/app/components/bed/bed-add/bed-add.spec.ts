import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAdd } from './bed-add';

describe('BedAdd', () => {
  let component: BedAdd;
  let fixture: ComponentFixture<BedAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(BedAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
