import axios from 'axios';
import queryString from 'query-string';
import { ClubMembershipInterface, ClubMembershipGetQueryInterface } from 'interfaces/club-membership';
import { GetQueryInterface } from '../../interfaces';

export const getClubMemberships = async (query?: ClubMembershipGetQueryInterface) => {
  const response = await axios.get(`/api/club-memberships${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createClubMembership = async (clubMembership: ClubMembershipInterface) => {
  const response = await axios.post('/api/club-memberships', clubMembership);
  return response.data;
};

export const updateClubMembershipById = async (id: string, clubMembership: ClubMembershipInterface) => {
  const response = await axios.put(`/api/club-memberships/${id}`, clubMembership);
  return response.data;
};

export const getClubMembershipById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/club-memberships/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClubMembershipById = async (id: string) => {
  const response = await axios.delete(`/api/club-memberships/${id}`);
  return response.data;
};
