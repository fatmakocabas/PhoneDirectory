import { User } from "./user.model";

export class AuthModel {
  authToken?: string;
  refreshToken?: string;
  expiresIn?: Date;
  authUser:User;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.authUser=auth.authUser;
  }
}
