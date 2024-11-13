import { Order } from "../models/Order.js";

export const OrderService = {
    createOrder: async (data) => {
        try {
            if (!data.bookID || !data.accountID || !data.date || !data.price)
                return ({
                    status: "ERR",
                    message: "Data is not enough",
                });
            else {
                const existingOrder = await Order.findOne({
                    accountID: data.accountID,
                    bookID: data.bookID,
                });
                if (existingOrder) {
                    if (existingOrder.status === "Đã thanh toán")
                        return ({
                            status: "ERR",
                            message: "This book has already bought",
                        });
                    else return ({
                            status: "OK",
                            message: "SUCCESS",
                            data: existingOrder,
                        });
                }
                else {
                    const newOrder = new Order({
                        bookID: data.bookID,
                        accountID: data.accountID,
                        price: data.price,
                        method: data.method,
                        status: data.status,
                        date: data.date,
                    });
                    const response = await newOrder.save();
                    if (response)
                        return ({
                            status: "OK",
                            message: "SUCCESS",
                            data: newOrder,
                        });
                    else return ({
                        status: "ERR",
                        message: "MongoDB failed",
                    });
                }
            }
        } catch (e) {
            throw e;
        }
    },

    updateOrderStatus: async (orderID,status) => {
        try {
            const response=  await Order.findOneAndUpdate({ _id: orderID },
                { status: status },
                { new: true })
            if (response) return { status:200, message: response }
            return {status: 400 , message: "Cập nhật đơn không thành công" }
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    checkPaidBook: async (bookID,accountID) => {
        try {
            const response=  await Order.findOne({ bookID: bookID, accountID: accountID, status: "Đã thanh toán" })
            return response
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
}