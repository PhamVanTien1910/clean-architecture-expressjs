import { ErrorResponse } from "../../response/error.response";
import { errorCodes, errorMessages } from "../../response/httpResponse";
import tokenService from "./token.service";
import userService from "../user.service";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status";

class AuthService {
  static async refreshAuth(refreshToken) {
    try {
      const refreshTokenDoc = await tokenService.verifyToken(refreshToken, "access");
      const user = await userService.getUserByUserName(refreshTokenDoc.username);
      
      let dataRole = await userService.getUserWithRole(user.id);

      if (!user) {
        throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, NOT_FOUND, errorCodes.USER_NOT_EXISTS);
      }

      return tokenService.generateToken(dataRole);
    } catch (error) {
      throw new ErrorResponse(errorMessages.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, errorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export default AuthService;
