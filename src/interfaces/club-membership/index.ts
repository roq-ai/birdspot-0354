import { UserInterface } from 'interfaces/user';
import { ClubInterface } from 'interfaces/club';
import { GetQueryInterface } from 'interfaces';

export interface ClubMembershipInterface {
  id?: string;
  user_id: string;
  club_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  club?: ClubInterface;
  _count?: {};
}

export interface ClubMembershipGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  club_id?: string;
}
