import { UNAUTHORIZED } from "http-status";
import { ErrorResponse } from "../../response/error.response.js";
import { errorCodes, errorMessages } from "../../response/httpResponse/index.js";
import userRepository from "../../../infrastructure/repository/user.repository.js";

class AuthService {
    async loginUser(rawData) {
        const user = await userRepository.findUserByUsername(rawData.username);
        if (!user) {
            throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, UNAUTHORIZED, errorCodes.USER_NOT_EXISTS);
        } 
        
        const isCorrectPassword = await userRepository.validateUserPassword(rawData.password, user.password);
        if (!isCorrectPassword) {
            throw new ErrorResponse(errorMessages.INCORRECT_PASSWORD, UNAUTHORIZED, errorCodes.INCORRECT_PASSWORD);
        }

        return {
            id: user.id,
            username: user.username,
        };
    }
}

export default new AuthService();
