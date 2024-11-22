import { Order } from "../models/Order.js";

export const OrderService = {
    getOrderByAccountID: async (accountID,skip,limit) => {
        try {
            const order = await Order.find({ accountID: accountID }).skip(skip).limit(limit);
            const totalOrders = await Order.countDocuments({accountID:accountID});
            return { success: true, data: order, totalPages: Math.ceil(totalOrders / limit)};
        }catch(error){
            console.log(error);
            return { success: false, message: "Lỗi lấy dữ liệu" };
        }
    },
    getOrderByID: async (orderID) => {
        try {
            const order = await Order.findOne({_id: orderID})
            return { success: true, data: order};
        }catch(error){
            console.log(error);
            return { success: false, message: "Lỗi lấy dữ liệu" };
        }
    },
    getAllOrders: async (skip, limit) => {
        try {
            const orders = await Order.find().skip(skip).limit(limit);
            const totalOrders = await Order.countDocuments();
            return { success: true, data: orders, totalPages: Math.ceil(totalOrders / limit)};
        }catch(error){
            console.log(error);
            return { success: false, message: "Lỗi lấy dữ liệu" };
        }
    },
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
    },
    updateOrder: async (orderID, order) => {
        try {
            const result = await Order.findOneAndUpdate({_id: orderID}, order, { new: true });
            return { success: true, data: result };
        }catch(error){
            return { success: false, message:  error.message};
        }
    },
    deleteOrder: async (orderID) => {
        try {
            const order = await Order.deleteOne({_id: orderID});
            return { success: true, data: order };
        }catch{
            return { success: false, message: "Lỗi xóa dữ liệu" };
        }
    },
    getPriceAll : async () => {
        try {
            const price = await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$price" }
                    }
                }
            ]);
            return { success: true, data: price[0].total };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi lấy dữ liệu" };
        }
    }
}