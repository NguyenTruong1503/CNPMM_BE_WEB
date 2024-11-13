import express from 'express';
import { OrderController } from '../controllers/OrderController.js';
import { MiddlewareController } from '../controllers/MiddlewareController.js';

const router = express.Router();

router.post('/buybook', MiddlewareController.verifyToken, OrderController.createOrder);
router.get("/momo_return", OrderController.handlePaymentReturn); // Định nghĩa tuyến đường để xử lý phản hồi từ MoMo
router.get("/checkPaidBook/:bookID/:accountID", MiddlewareController.verifyToken, OrderController.checkPaidBook)


export default router;