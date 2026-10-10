import { Room } from './room.model';

export interface Bed {
  id?: number;

  roomId: number;

  room?: Room;

  bedNumber: string;

  status: string;

  price: number;
}