export interface User {
  id: string;
  name: string;
  email: string;
  is_guest: boolean;
  plan_id?: string;
  avatar_url?: string; // Optional, can be undefined if not provided
}

export interface UserCredentials {
  email: string;
  password: string;
  confirm_password?: string; // Optional, used during signup
}
