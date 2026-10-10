import { Tenant } from './tenant.model';

export interface Complaint {

  id?: number;

  tenantId: number;

  tenant?: Tenant;

  title: string;

  description: string;

  status: string;

  createdAt?: string;

  resolvedAt?: string;
}