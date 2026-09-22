export interface Notice {
  id?: number;
  title: string;
  content: string;
  createdBy: number;
  targetAudience: string;
  createdAt?: string;
}