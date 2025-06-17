export interface User {
  id: string;
  credentials?: UserCredentials;
  isGuest: boolean;
  planId?: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
