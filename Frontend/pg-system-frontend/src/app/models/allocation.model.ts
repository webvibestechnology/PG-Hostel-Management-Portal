export interface Allocation {
  id?: number;
  tenantId: number;
  bedId: number;
  startDate: string;
  endDate?: string;
  status: string;
}