import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationAdd } from './allocation-add';

describe('AllocationAdd', () => {
  let component: AllocationAdd;
  let fixture: ComponentFixture<AllocationAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocationAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
