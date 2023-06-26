import axios from 'axios';
import queryString from 'query-string';
import { SightingInterface, SightingGetQueryInterface } from 'interfaces/sighting';
import { GetQueryInterface } from '../../interfaces';

export const getSightings = async (query?: SightingGetQueryInterface) => {
  const response = await axios.get(`/api/sightings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSighting = async (sighting: SightingInterface) => {
  const response = await axios.post('/api/sightings', sighting);
  return response.data;
};

export const updateSightingById = async (id: string, sighting: SightingInterface) => {
  const response = await axios.put(`/api/sightings/${id}`, sighting);
  return response.data;
};

export const getSightingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sightings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSightingById = async (id: string) => {
  const response = await axios.delete(`/api/sightings/${id}`);
  return response.data;
};
