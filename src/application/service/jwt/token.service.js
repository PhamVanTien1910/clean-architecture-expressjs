import jwt from "jsonwebtoken";
import moment from "moment";
import db from "../../../domain/models/index.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status";
import { ErrorResponse } from "../../response/error.response.js";
import { errorCodes, errorMessages } from "../../response/httpResponse/index.js";

require('dotenv').config();

const generateToken = (data, secret = process.env.SECRETKEY) => {
    const expiresInHours = parseInt(process.env.TOKEN_EXPIRES_IN_HOURS, 10) || 1;
    const expires = moment().add(expiresInHours, 'hours');
    const payload = {
      sub: data.username,
      role: data.role.name,
      iat: moment().unix(),
      exp: expires.unix(),
      type: "access"
    };
    return jwt.sign(payload, secret);
};

const saveToken = async (username, token, type) => {
    try {
        const expiresInHours = parseInt(process.env.TOKEN_EXPIRES_IN_HOURS, 10) || 1;
        const expires = moment().add(expiresInHours, 'hours').toDate();
        const newToken = await db.Token.create({
            username: username,
            token,
            expires_at: expires,
            type: type
        });
        
        return newToken;
    } catch (error) {
        throw new ErrorResponse(errorMessages.ERROR_TOKEN, INTERNAL_SERVER_ERROR, errorCodes.ERROR_TOKEN);
    }
};

const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, process.env.SECRETKEY);
    const tokenDoc = await db.Token.findOne({where: {
        token,
        type,
        username: payload.sub,
      } });
    if (!tokenDoc) {
      throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, NOT_FOUND, errorCodes.USER_NOT_EXISTS);
    }
    return tokenDoc;
  };

export default {
    generateToken,
    saveToken,
    verifyToken,
};
