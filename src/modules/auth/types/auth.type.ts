export interface IAuth {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive";
  created_at: string;
  last_login: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}
