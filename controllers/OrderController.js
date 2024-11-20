import PaymentService from "../services/PaymentService.js";
import { OrderService } from "../services/OrderService.js";
export const OrderController = {
  getOrderByAccountID: async (req, res) => {
        const accountID = req.params.accountID
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit)|| 10;
        const skip = (page - 1) * limit;
        const result = await OrderService.getOrderByAccountID(accountID,skip,limit);
        if (result.success) {
            return res.status(200).json({ data: result.data, totalPages: result.totalPages });
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
  getOrderByID: async (req, res) => {
        const orderID = req.params.orderID
        const result = await OrderService.getOrderByID(orderID);
        if (result.success) {
            return res.status(200).json({ data: result.data });
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
    getAllOrders: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit)|| 10;
        const skip = (page - 1) * limit;
        const result = await OrderService.getAllOrders(skip,limit);
        if (result.success) {
            return res.status(200).json({ data: result.data, totalPages: result.totalPages });
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
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
  },
    checkPaidBook: async (req, res) => {
    try {
        const {bookID,accountID} = req.params;
        const result = await OrderService.checkPaidBook(bookID,accountID);
    if (result) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ data: result });
    }
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
  },
    updateOrder: async (req, res) => {
        const orderID = req.params.orderID;
        const order = req.body;
        const result = await OrderService.updateOrder(orderID, order);
        if (result.success) {
          return res.status(200).json({ data: result.data } );
        }
        return res.status(500).json(ResponseDetail(500, { message: result.message }));
  },
    deleteOrder: async (req, res) => {
        const orderID = req.params.orderID;
        const result = await OrderService.deleteOrder(orderID);
        if (result.success) {
          return res.status(200).json({ data: result.data });
        }else {
            return res.status(500).json(ResponseDetail(500, { message: result.message }));
        }
    },
}