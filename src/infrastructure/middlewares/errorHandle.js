import { ErrorResponse } from "../../application/response/error.response.js";

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.status || 500).json({
      code: err.err_code,
      message: err.message,
    });
  }
};

export default errorMiddleware;