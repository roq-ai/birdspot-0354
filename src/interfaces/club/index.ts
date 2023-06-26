import { ClubMembershipInterface } from 'interfaces/club-membership';
import { SightingInterface } from 'interfaces/sighting';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClubInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  club_membership?: ClubMembershipInterface[];
  sighting?: SightingInterface[];
  user?: UserInterface;
  _count?: {
    club_membership?: number;
    sighting?: number;
  };
}

export interface ClubGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
