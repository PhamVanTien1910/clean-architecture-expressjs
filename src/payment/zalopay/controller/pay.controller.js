import paymentService from "../service/pay.service";

const payment = async (req, res) => {
    try {
        const result = await paymentService.createPayment(req.body);
        return res.status(200).json({
          order_url: result
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const result = await paymentService.updateOrderStatus(req.body.data, req.body.mac);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const orderStatus = async (req, res) => {
  const app_trans_id = req.params.app_trans_id;
  try {
      const result = await paymentService.checkOrderStatus(app_trans_id);
      return res.status(200).json(result);
  } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
  }
};

export default { payment, updateOrder, orderStatus };
