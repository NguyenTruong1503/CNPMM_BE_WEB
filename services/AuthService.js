import {Account} from '../models/Account.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const AuthService = {
    generateAccessToken: (data) => {
        const accessToken = jwt.sign(
            data,
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "2h" }
        )
        return accessToken
    },
    generateRefreshToken: (data) => {
        const accessToken = jwt.sign(
            data,
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "7d" }
        )
        return accessToken
    },
    createAccount: async (authData) => {
        try {
            const { username, password, email, name} = authData;
            
            const hashPassword = await bcrypt.hash(password, 10);
            const account = await new Account({ 
                name: name, 
                password:hashPassword,
                email: email, 
                username: username});

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
    },
    loginUser: async (authData) => {
        try {
            const { username, password } = authData;
            const account = await Account.findOne({ username: username });
            if (!account) {
                return { success: false, message: "Tài khoản không tồn tại" };
            }
            const checkPassword = await bcrypt.compare(password, account.password);
            if (!checkPassword) {
                return { success: false, message: "Sai mật khẩu" };
            }
            const data = {
                accountId: account._id,
                is_admin : account.is_admin,
            };
            const accessToken = AuthService.generateAccessToken(data);
            const refreshToken = AuthService.generateRefreshToken(data);
            return { success: true, data: {account, accessToken}, refreshToken: refreshToken };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi đăng nhập" };
        }
    },
    refreshToken: async (refreshToken) => {
        try {
            jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY, (err, user)=> {
                if (err) {
                    return { success: false, message: "Token không hợp lệ" };
                }
                const data = {
                    accountId: account._id,
                    is_admin : account.is_admin,
                };
                const accessToken = AuthService.generateAccessToken(data);
                const refreshToken = AuthService.generateRefreshToken(data);
                return { success: true, data: {account, accessToken}, refreshToken: refreshToken };
            });
        } catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi refresh token" };
        }
    }
};