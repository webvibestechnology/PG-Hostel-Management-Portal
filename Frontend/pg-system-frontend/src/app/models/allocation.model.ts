import { Bed } from './bed.model';
import { Tenant } from './tenant.model';

export interface Allocation {

  id?: number;

  tenantId: number;

  bedId: number;

  startDate: string;

  endDate?: string;

  status: string;

  tenant?: Tenant;

  bed?: Bed;
}