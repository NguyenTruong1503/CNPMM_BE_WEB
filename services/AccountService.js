import {Account} from '../models/Account.js';
import bcrypt from 'bcrypt';

export const AccountService = {
    createAccount: async (accountData) => {
        try {
            const { name, password, email, phone} = accountData;
            const hashPassword = await bcrypt.hash(password, 10);
            const account = await new Account({ 
                name: name, 
                password:hashPassword,
                email: email, 
                phone: phone });

            // Kiểm tra tính hợp lệ của dữ liệu
            let error = account.validateSync();
            if (error) {
                return { success: false, message: Object.values(error.errors)[0].message || 'Lỗi' };
            }

            // Lưu sách vào cơ sở dữ liệu
            const response = await account.save();
            if (response) {
                return { success: true, data: account };
            }
            return { success: false, message: "Tạo tài khoản không thành công" };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi tạo tài khoản" };
        }
    }
};