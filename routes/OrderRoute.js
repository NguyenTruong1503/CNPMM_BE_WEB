import express from 'express';
import { OrderController } from '../controllers/OrderController.js';
import { MiddlewareController } from '../controllers/MiddlewareController.js';

const router = express.Router();

router.get("/getOrderByID/:orderID", MiddlewareController.verifyToken, OrderController.getOrderByID);
router.get("/getAll", OrderController.getAllOrders);
router.post('/buybook', MiddlewareController.verifyToken, OrderController.createOrder);
router.get("/momo_return", OrderController.handlePaymentReturn); // Định nghĩa tuyến đường để xử lý phản hồi từ MoMo
router.get("/checkPaidBook/:bookID/:accountID", MiddlewareController.verifyToken, OrderController.checkPaidBook)
router.patch("/updateOrder/:orderID", MiddlewareController.verifyAdmin, OrderController.updateOrder);
router.delete('/deleteOrder/:orderID', MiddlewareController.verifyAdmin,OrderController.deleteOrder);


export default router;