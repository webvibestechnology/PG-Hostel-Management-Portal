export interface Payment {
  id?: number;
  tenantId: number;
  amount: number;
  paymentDate: string;
  amountPaid: number;
  paymentMode: string;
  status: string;
  remarks?: string;
  transactionId?: string;
}
