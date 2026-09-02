import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAdd } from './visitor-add';

describe('VisitorAdd', () => {
  let component: VisitorAdd;
  let fixture: ComponentFixture<VisitorAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
