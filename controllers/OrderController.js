import PaymentService from "../services/PaymentService.js";
import { OrderService } from "../services/OrderService.js";
export const OrderController = {
    createOrder: async (req, res) => {
    try {
        const data = req.body;
    const result = await OrderService.createOrder(data);
    if (result.status === "OK") {
      const paymentUrl = await PaymentService.createPaymentUrl(result.data._id.toString(), result.data.price, 'Payment for booking');
      return res.status(200).json({
        status: "OK",
        message: "Booking created successfully",
        paymentUrl: paymentUrl
      });
    } else {
      return res.status(400).json(result);
    }
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
    },

    handlePaymentReturn: async (req, res) => {
        try {
            const { orderId, resultCode } = req.query;
            console.log(req.query);
            const oderID = orderId.split('_')[0]; // Sử dụng orderId để cập nhật
            const paymentStatus = resultCode === '0' ? 'success' : 'failed';

            if (paymentStatus === 'success') {
                await OrderService.updateOrderStatus(oderID, 'Đã thanh toán');
                return res.status(200).json({
                    status: "OK",
                    message: "Payment successful",
                });
            } else {
                return res.status(400).json({
                    status: "ERR",
                    message: "Payment failed",
                });
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: "ERR",
                message: e.message,
            });
        }
    }
}