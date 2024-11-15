import { Account } from '../models/Account.js';

export const UserService = {
    getAllUser: async () => {
        try {
            const users = await Account.find();
            return { success: true, data: users };
        }catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi lấy dữ liệu" };
        }
    },
    deleteUser: async (userId) => {
        try {
            const user = await Account.findOneAndDelete({ accountId: userId });
            if (!user) {
                return { success: false, message: "Người dùng không tồn tại" };
            }
            return { success: true, data: "Xóa thành công" };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi xóa người dùng" };
        }
    },
    
    // deleteUser: async (userId) => {
    //     try {
    //         const user = await Account.findOne({ accountId: userId });
    //         if (!user) {
    //             return { success: false, message: "Người dùng không tồn tại" };
    //         }
    //         user.isDeleted = true;
    //         await user.save();  // Save the change
    //         return { success: true, data: "Xóa thành công" };
    //     } catch (error) {
    //         console.log(error);
    //         return { success: false, message: "Lỗi xóa người dùng" };
    //     }
    // },
    updateUser: async (userId, userData) => {
        try {
            const user = await Account.findOneAndUpdate({accountId: userId}, userData, {new: true});
            if (!user) {
                return { success: false, message: "Người dùng không tồn tại" };
            }
            return { success: true, data: "Update thành công" };
        }catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi cập nhật người dùng" };
        }
    },
    findUserById: async (userId) => {
        try {
            const user = await Account.findOne({accountId: userId});
            if (!user) {
                return { success: false, message: "Người dùng không tồn tại" };
            }
            return { success: true, data: user };
        }catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi tìm người dùng" };
        }
    },
}