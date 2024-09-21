import { isValidEmail } from "./inputValidators.js";
import { isValidUsername } from "./inputValidators.js";
import { isValidPhone } from "./inputValidators.js";
import { BAD_REQUEST } from "http-status";
import { ErrorResponse } from "../response/error.response.js";
import { errorCodes, errorMessages } from "../response/httpResponse/index.js";

 const registerValidate = (userdto) => {
    if (!isValidEmail(userdto.email)) {
        throw new ErrorResponse(errorMessages.INVALID_EMAIL, BAD_REQUEST, errorCodes.INVALID_EMAIL);
    }
    if (!isValidUsername(userdto.username)) {
        throw new ErrorResponse(errorMessages.INVALID_USERNAME, BAD_REQUEST, errorCodes.INVALID_USERNAME);
    }
    if (!isValidPhone(userdto.phone)) {
        throw new ErrorResponse(errorMessages.INVALID_PHONE, BAD_REQUEST, errorCodes.INVALID_PHONE);
    }  
}

export default registerValidate;