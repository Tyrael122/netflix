export interface User {
  id: string;
  credentials?: UserCredentials;
  isGuest: boolean;
}

export interface UserCredentials {
  username: string;
  password: string;
}
