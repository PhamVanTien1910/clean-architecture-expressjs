import { ErrorResponse } from "../../response/error.response.js";
import bcrypt from "bcryptjs";
import { NOT_FOUND } from "http-status";
import { RegisterDto } from "../../dto/register.dto.js";
import registerValidate from "../../validation/register.validation.js";
import { errorCodes, errorMessages } from "../../response/httpResponse/index.js";
import userRepository from "../../../infrastructure/repository/user.repository.js";


const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
}
const createUser = async (userdto) => {
    try {
       await registerValidate(userdto);
      
       let isEmailExisted = await userRepository.findUserByEmail(userdto.email);
       let isUserNameExisted = await userRepository.findUserByUsername(userdto.username);
       
       if(isUserNameExisted){
        throw new ErrorResponse(errorMessages.USER_EXISTS, NOT_FOUND, errorCodes.USER_EXISTS);
       }
       
       if(isEmailExisted ){
        throw new ErrorResponse(errorMessages.EMAIL_EXISTS, NOT_FOUND, errorCodes.EMAIL_EXISTS);
       }
       
       const userPassword = await hashPassword(userdto.password);
       
       const userDtoWithHashedPassword = RegisterDto(userdto, userPassword);
       let data = await userRepository.createUser(userDtoWithHashedPassword);
       
    return {
        id: data.id,
        username: data.username,
        email: data.email
    };
    } catch (error) {
        throw error;
    }
}



export default { createUser
}