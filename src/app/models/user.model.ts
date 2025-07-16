export interface User {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
  planId?: string;
  avatarUrl?: string; // Optional, can be undefined if not provided
}

export interface UserCredentials {
  email: string;
  password: string;
  confirmPassword?: string; // Optional, used during signup
}
