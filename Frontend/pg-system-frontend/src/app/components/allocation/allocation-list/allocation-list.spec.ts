import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationList } from './allocation-list';

describe('AllocationList', () => {
  let component: AllocationList;
  let fixture: ComponentFixture<AllocationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationList],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
