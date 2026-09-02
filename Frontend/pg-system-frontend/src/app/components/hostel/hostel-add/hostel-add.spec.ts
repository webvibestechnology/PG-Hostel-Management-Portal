import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelAdd } from './hostel-add';

describe('HostelAdd', () => {
  let component: HostelAdd;
  let fixture: ComponentFixture<HostelAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(HostelAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
