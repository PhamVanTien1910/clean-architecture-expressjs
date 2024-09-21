const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
const qs = require('qs')
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

const paymentService = {
    async createPayment(orderData) {
        const transID = Math.floor(Math.random() * 1000000);
        const embed_data = { redirecturl: "https://roadmap.sh/backend" };
        const items = [{}];
        
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: "user123",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 50000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "",
            callback_url: "https://7a0d-2402-800-6235-2bc6-fc31-ff97-5776-5a70.ngrok-free.app/api/v1/callback"
        };

        const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        try {
            const result = await axios.post(config.endpoint, null, { params: order });
            return result.data.order_url;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateOrderStatus(dataStr, reqMac) {
        const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        
        if (reqMac !== mac) {
            return { return_code: -1, return_message: "mac not equal" };
        }

        const dataJson = JSON.parse(dataStr);
        console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

        return { return_code: 1, return_message: "success" };
    },

    async checkOrderStatus(app_trans_id) {
        let postData = {
            app_id: config.app_id,
            app_trans_id: app_trans_id
        };

        let data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        let postConfig = {
            method: 'post',
            url: "https://sb-openapi.zalopay.vn/v2/query",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(postData)
        };

        try {
            const result = await axios(postConfig);
            return result.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = paymentService;
