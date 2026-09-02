import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeAdd } from './notice-add';

describe('NoticeAdd', () => {
  let component: NoticeAdd;
  let fixture: ComponentFixture<NoticeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
