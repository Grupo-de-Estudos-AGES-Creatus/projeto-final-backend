import { Role } from "./roles/roles.enum";

// Interface do token JWT
export interface JwtPayload {
  userId: number; 
  firstAcess: boolean;
  role: Role; 
}
