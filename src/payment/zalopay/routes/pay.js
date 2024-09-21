import express from "express";
import payController from "../controller/pay.controller.js";

let router = express.Router();
const initPayRouter = async(app) => {
    router.post("/payment", payController.payment)
    router.post("/callback", payController.updateOrder)
    router.post("/order-status/:app_trans_id", payController.orderStatus)
    return app.use("/api/v1", router);
}

export default initPayRouter;