import { NOT_FOUND } from 'http-status';
import { ErrorResponse } from '../../application/response/error.response.js';
import { errorCodes, errorMessages } from '../../application/response/httpResponse/index.js';

const validateUserInput = (req, res, next) => {
    const { email, password, username, phone, address, sex } = req.body;
    if (!email || !password || !username || !phone || !address || !sex) {
       throw new ErrorResponse(errorMessages.MISSING_INPUTS, NOT_FOUND, errorCodes.MISSING_INPUTS)
    }
    next();
};

export default validateUserInput;