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
            const user = await Account.deleteOne({accountId: userId});
            if (!user) {
                return { success: false, message: "Người dùng không tồn tại" };
            }
            return { success: true, data: "Xóa thành công" };
        }catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi xóa người dùng" };
        }
    },
}