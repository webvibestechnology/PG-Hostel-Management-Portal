export interface Room {
  id?: number;
  hostelId: number;
  roomNumber: string;
  roomType: string;
  floor: number;
  status: string;
  capacity: number;
}