export interface TUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  password?: string;
  role?: "admin" | "user" | "moderator";
  status?: "active" | "inactive";
  created_at?: string;
  last_login?: string;
}
