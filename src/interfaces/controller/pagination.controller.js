import { OkResponse } from "../../application/response/success.response";
import userService from "../../application/service/user.service";

class pageController {
    static getUsers = async(req, res, next) => {
        try{
            let { page, limit } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;
            const users = await userService.getUsers({ offset, limit });
            new OkResponse({
            data:  users
        }).send(res);
        } catch(error){
           next(error)
        }
    }
}

export default pageController