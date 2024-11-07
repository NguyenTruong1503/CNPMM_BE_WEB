import {Account} from '../models/Account.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import mailer from './EmailService.js';
const verifyAsync = promisify(jwt.verify);
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
    // createAccount: async (authData) => {
    //     try {
    //         const { username, password, email} = authData;
            
    //         const existingUser = await User.findByEmail(email);
    // if (existingUser) {
    //     throw new Error('User credentials already exist.');
    // }

    // const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

    // // Create the user
    // const user = await Account.create({ username, email, password: hashedPassword });

    // // Generate email verification link
    // const hashedEmail = await bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND));
    // const verificationLink = `${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}`;
    // console.log(verificationLink);

    // // Send verification email
    // await mailer.sendMail(user.email, "Verify Email", `<a href="${verificationLink}"> Verify </a>`);

    // return { verificationLink };
    //     } catch (error) {
    //         console.log(error);
    //         return { success: false, message: "Lỗi tạo tài khoản" };
    //     }
    // },
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
                accountId: account.accountId,
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
            const account = await verifyAsync(refreshToken, process.env.JWT_ACCESS_KEY);
            const data = {
                accountId: account.accountId,
                is_admin: account.is_admin,
            };
            const accessToken = AuthService.generateAccessToken(data);
            const newRefreshToken = AuthService.generateRefreshToken(data);
            return { success: true, data: { accessToken }, refreshToken: newRefreshToken };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Lỗi refresh token" };
        }
    },
};