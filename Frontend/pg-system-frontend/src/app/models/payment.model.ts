import { Tenant } from './tenant.model';

export interface Payment {

  id?: number;

  tenantId: number;

  tenant?: Tenant;

  amount: number;

  paymentDate: string;

  paymentMonth: string;

  amountPaid?: number;

  paymentMode: string;

  status: string;

  remarks?: string;

  transactionId?: string;
}