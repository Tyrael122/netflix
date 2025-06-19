export interface Plan {
  id: string;
  name: string;
  price: number;
  features: PlanFeatures;
}

interface PlanFeatures {
  playlistCreation: {
    limit: number;
    description: string;
  };
  reviews: {
    canView: boolean;
    canWrite: boolean;
    canReply: boolean;
  };
  search: {
    type: 'basic' | 'advanced';
    hasFilters: boolean;
    hasSorting: boolean;
  };
  similarMovies: boolean;
  trailers: boolean;
}

export enum Plans {
  Free = 'Free',
  Pro = 'Pro',
  Premium = 'Premium'
}

export const PLANS: Plan[] = [
  {
    id: Plans.Free,
    name: 'Free',
    price: 0,
    features: {
      playlistCreation: {
        limit: 0,
        description: 'Create up to 2 playlists'
      },
      reviews: {
        canView: true,
        canWrite: false,
        canReply: false
      },
      search: {
        type: 'basic',
        hasFilters: false,
        hasSorting: false
      },
      similarMovies: false,
      trailers: false
    }
  },
  {
    id: Plans.Pro,
    name: 'Pro',
    price: 10,
    features: {
      playlistCreation: {
        limit: 10,
        description: 'Create up to 10 custom playlists'
      },
      reviews: {
        canView: true,
        canWrite: true,
        canReply: false
      },
      search: {
        type: 'basic',
        hasFilters: false,
        hasSorting: false
      },
      similarMovies: true,
      trailers: true
    }
  },
  {
    id: Plans.Premium,
    name: 'Premium',
    price: 15,
    features: {
      playlistCreation: {
        limit: Infinity,
        description: 'Unlimited custom playlists'
      },
      reviews: {
        canView: true,
        canWrite: true,
        canReply: true
      },
      search: {
        type: 'advanced',
        hasFilters: true,
        hasSorting: true
      },
      similarMovies: true,
      trailers: true
    }
  }
];
