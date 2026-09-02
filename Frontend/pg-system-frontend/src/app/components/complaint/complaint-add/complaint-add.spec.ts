import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintAdd } from './complaint-add';

describe('ComplaintAdd', () => {
  let component: ComplaintAdd;
  let fixture: ComponentFixture<ComplaintAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
