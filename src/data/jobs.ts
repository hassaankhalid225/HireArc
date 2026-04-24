export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  isRemote: boolean;
  posted: string;
  source: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$180k - $240k',
    isRemote: true,
    posted: '2 hours ago',
    source: 'Greenhouse'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Stripe',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140k - $200k',
    isRemote: true,
    posted: '5 hours ago',
    source: 'Lever'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Spotify',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$90k - $130k',
    isRemote: false,
    posted: '1 day ago',
    source: 'Greenhouse'
  },
  {
    id: 4,
    title: 'Frontend Engineer (React)',
    company: 'Vercel',
    location: 'Remote',
    type: 'Full-time',
    salary: '$160k - $220k',
    isRemote: true,
    posted: '3 hours ago',
    source: 'Lever'
  },
  {
    id: 5,
    title: 'Marketing Manager',
    company: 'Discord',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130k - $170k',
    isRemote: true,
    posted: '8 hours ago',
    source: 'Greenhouse'
  },
  {
    id: 6,
    title: 'DevOps Specialist',
    company: 'Cloudflare',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$150k - $210k',
    isRemote: false,
    posted: '12 hours ago',
    source: 'Lever'
  }
];
