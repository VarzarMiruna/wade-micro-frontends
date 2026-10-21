const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname);

export const apps = [
  {
    name: 'Browse',
    team: 'Team Browse',
    mountId: 'browse-root',
    color: '#2563eb',
    url: isLocal ? 'http://localhost:4001' : 'https://wade-mfe-browse.vercel.app',
  },
  {
    name: 'Restaurant',
    team: 'Team Restaurant',
    mountId: 'restaurant-root',
    color: '#16a34a',
    url: isLocal ? 'http://localhost:4002' : 'https://wade-mfe-restaurant.vercel.app',
  },
  {
    name: 'Profile',
    team: 'Team Profile',
    mountId: 'profile-root',
    color: '#9333ea',
    url: isLocal ? 'http://localhost:4003' : 'https://wade-mfe-profile.vercel.app',
  },
];

export function downApps() {
  return new URLSearchParams(location.search).getAll('down');
}
