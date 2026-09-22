export interface Tenant {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  aadharNumber: string;
  emergencyContact: string;
  joinDate: string;
  status?: 'ACTIVE' | 'INACTIVE';
}