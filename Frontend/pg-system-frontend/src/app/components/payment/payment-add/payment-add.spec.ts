import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAdd } from './payment-add';

describe('PaymentAdd', () => {
  let component: PaymentAdd;
  let fixture: ComponentFixture<PaymentAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
