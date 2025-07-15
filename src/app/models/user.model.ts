export interface User {
  id: string;
  name: string;
  credentials?: UserCredentials;
  isGuest: boolean;
  planId?: string;
  avatarUrl?: string; // Optional, can be undefined if not provided
}

export interface UserCredentials {
  email: string;
  password: string;
}
