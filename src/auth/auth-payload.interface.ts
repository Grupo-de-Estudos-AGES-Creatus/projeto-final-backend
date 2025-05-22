import { Role } from "./roles/roles.enum";

export interface JwtPayload {
  userId: number; 
  firstAcess: boolean;
  role: Role; 
}
