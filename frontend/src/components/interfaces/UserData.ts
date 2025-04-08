type UserRole = "USER" | "ADMIN";

export interface UserData {
  id: string;
  login: string;
  role: UserRole;
}
