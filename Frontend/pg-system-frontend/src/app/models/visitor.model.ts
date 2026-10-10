import { Tenant } from './tenant.model';

export interface Visitor {
  id?: number;

  tenantId: number;
  tenant?: Tenant;

  // Visitor details
  visitorName: string;
  visitorPhone: string;
  purpose: string;

  // Visit details
  visitDate: string;
  checkInTime: string;
  checkOutTime?: string | null;
}

export interface VisitorRequest {
  tenantId: number;
  visitorname: string;
  visitorPhone: string;
  purpose: string;
  visitDate: string;
  checkInTime: string;
}