const mapping: Record<string, string> = {
  clubs: 'club',
  'club-memberships': 'club_membership',
  sightings: 'sighting',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
