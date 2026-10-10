export interface Room {

  id?: number;

  hostelId: number;

  hostel?: {
    id: number;
    name: string;
  };

  roomNumber: string;
  roomType: string;
  floor: number;
  status: string;
  capacity: number;
}