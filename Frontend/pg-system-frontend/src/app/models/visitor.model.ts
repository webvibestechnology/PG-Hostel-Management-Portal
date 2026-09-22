export interface Visitor {
  id?: number;
  tenantId: number;
  visitorname: string;
  visitorPhone: string;
  purpose: string;
  checkIn?: string;
  checkOut?: string;
}
