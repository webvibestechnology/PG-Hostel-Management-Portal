export interface Complaint {
  id?: number;
  tenantId: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
  resolvedAt?: string;
}