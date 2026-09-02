import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedEdit } from './bed-edit';

describe('BedEdit', () => {
  let component: BedEdit;
  let fixture: ComponentFixture<BedEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(BedEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
