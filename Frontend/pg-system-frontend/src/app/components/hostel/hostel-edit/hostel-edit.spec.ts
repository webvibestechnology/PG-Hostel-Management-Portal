import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelEdit } from './hostel-edit';

describe('HostelEdit', () => {
  let component: HostelEdit;
  let fixture: ComponentFixture<HostelEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(HostelEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
