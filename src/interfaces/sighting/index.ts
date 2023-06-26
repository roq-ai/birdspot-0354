import { UserInterface } from 'interfaces/user';
import { ClubInterface } from 'interfaces/club';
import { GetQueryInterface } from 'interfaces';

export interface SightingInterface {
  id?: string;
  bird_name: string;
  location: string;
  date: any;
  user_id: string;
  club_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  club?: ClubInterface;
  _count?: {};
}

export interface SightingGetQueryInterface extends GetQueryInterface {
  id?: string;
  bird_name?: string;
  location?: string;
  user_id?: string;
  club_id?: string;
  status?: string;
}
