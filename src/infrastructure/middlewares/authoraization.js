import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../../application/response/error.response';
import { errorCodes, errorMessages } from '../../application/response/httpResponse';
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    throw new ErrorResponse(errorMessages.INVALID_TOKEN, NOT_FOUND, errorCodes.INVALID_TOKEN);
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      throw new ErrorResponse(errorMessages.INVALID_TOKEN, FORBIDDEN, errorCodes.INVALID_TOKEN);
    }
    
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorResponse(errorMessages.UNAUTHORIZED, UNAUTHORIZED, errorCodes.UNAUTHORIZED);
    }
    next();
  };
}

export const authenticateAndAuthorize = (...role) => [
  authenticateToken,
  authorizeRoles(...role),
];


