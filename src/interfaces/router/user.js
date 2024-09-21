import express from "express";
import {authenticateAndAuthorize} from "../../infrastructure/middlewares/authoraization.js"
import pageController from "../controller/pagination.controller.js";
import { ROLES } from "../../infrastructure/config/constant/role.constant.js";
import userController from "../controller/user.controller.js";
let router = express.Router();

const initUserRouter = async(app) => {
    router.put("/update-user/:id", authenticateAndAuthorize(ROLES.ADMIN, ROLES.USER), userController.updateUser);
    router.get("/page", authenticateAndAuthorize(ROLES.ADMIN, ROLES.USER),pageController.getUsers);
    router.delete("/delete/:id", userController.deleteUser);
    return app.use("/api/v1", router);
}



export default initUserRouter;