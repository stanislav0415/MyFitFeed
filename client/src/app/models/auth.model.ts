import { User } from "./user.model";

export interface AuthModel {
    user: User;
  token?: string;
}