import { Account } from '../models/Account.js';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/AuthService.js';
import { ResponseData, ResponseDetail } from '../services/ResponseJSON.js';
import sendMail from '../services/EmailService.js'; // Đảm bảo import đúng
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AuthController = {
    createAccount: async (req, res) => {
        const { email, password, username, birthday, sex } = req.body;
        const name = username;

        if (password.length < 8) {
            return res.status(400).json(ResponseDetail(400, { message: 'Password must be at least 8 characters long.' }));
        }



        if (email && password && name && username && birthday && sex) {
            try {
                const existingUser = await Account.findOne({ email });
                if (existingUser) {
                    return res.status(409).json(ResponseDetail(409, { message: 'User credentials already exist.' }));
                }

                const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
                const newUser = new Account({
                    name,
                    email,
                    username,
                    password: hashedPassword,
                    birthday,
                    sex,
                });

                const savedUser = await newUser.save();
                const hashedEmail = await bcrypt.hash(savedUser.email, parseInt(process.env.BCRYPT_SALT_ROUND));
                const verifyUrl = `${process.env.APP_URL}/api/auth/verify?email=${savedUser.email}&token=${hashedEmail}`;
                const emailTemplatePath = path.resolve(__dirname, '../config/email.html');
                const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

    
                const emailContent = emailTemplate.replace('{{verifyUrl}}', verifyUrl);

                await sendMail(savedUser.email, "Chỉ còn một bước nữa để hoàn tất đăng ký của bạn!", emailContent);
                return res.status(201). json(ResponseData(201, { message: 'Account created successfully. Please verify your email.' }));
            } catch (error) {
                console.log(error);
                return res.status(500).json(ResponseDetail(500, { message: 'Internal Server Error' }));
            }
        } else {
            return res.status(400).json(ResponseDetail(400, { message: 'Missing required fields.' }));
        }
    },


    
    verify: async (req, res) => {
        try {
            const { email, token } = req.query;
            const isMatch = await bcrypt.compare(email, token);
            if (isMatch) {
                const user = await Account.findOneAndUpdate({ email }, { is_active: true });
                if (user) {
                    // Redirect to the success page in the frontend
                    return res.redirect(`${process.env.FRONTEND_URL}/verification-success`);
                } else {
                    return res.status(404).json(ResponseDetail(404, { message: 'User not found.' }));
                }
            } else {
                return res.status(400).json(ResponseDetail(400, { message: 'Invalid verification token.' }));
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseDetail(500, { message: 'Internal Server Error' }));
        }
    },
    loginUser: async (req, res) => {
        const accountData = {
            username: req.body.username,
            password: req.body.password,
        };
        const result = await AuthService.loginUser(accountData);    
        if (result.success){
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });
            console.log(req.cookies.refreshToken);
            return res.status(200).json(ResponseData(200, result.data));
        }else {
            return res.status(400).json(ResponseDetail(400, { message: result.message }));
        }
    }, 
    refreshToken: async (req, res) => {
        const refreshToken1 = req.cookies.refreshToken;
        
        // Check if the refresh token is present
        if (!refreshToken1) {
            return res.status(401).json(ResponseDetail(401, { message: "Vui lòng đăng nhập" }));
        }
    
        try {
            // Call your AuthService to refresh the token
            const result = await AuthService.refreshToken(refreshToken1);
    
            // Check if the service successfully returned a new token
            if (result.success) {
                // Set the new refresh token in a secure cookie
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                });
    
                // Return the new access token and any other data needed
                return res.status(200).json(ResponseData(200, result.data));
            } else {
                // Return an error if refreshing the token failed
                return res.status(400).json(ResponseDetail(400, { message: result.message }));
            }
        } catch (error) {
            // Handle any errors in the refresh process
            console.error("Error in refreshing token:", error);
            return res.status(500).json(ResponseDetail(500, { message: "Lỗi máy chủ" }));
        }
    },
    
    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");
        return res.status(200).json(ResponseData(200, "Đăng xuất thành công"));
    },
    forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await Account.findOne({ email });
            if (!user) {
                return res.status(404).json(ResponseDetail(404, { message: 'Tài khoản không tồn tại.' }));
            }

            const hashedEmail = await bcrypt.hash(email, parseInt(process.env.BCRYPT_SALT_ROUND));
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password?email=${email}&token=${hashedEmail}`;
            const emailTemplatePath = path.resolve(__dirname, '../config/forgotPassword.html');
            const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
            const emailContent = emailTemplate.replace('{{resetUrl}}', resetUrl);

            await sendMail(email, "Khôi phục mật khẩu", emailContent);
            return res.status(201).json(ResponseData(201, { message: 'Đã gửi yêu cầu khôi phục mật khẩu.' }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseDetail(500, { message: 'Internal Server Error' }));
        }
    },
    
    resetPassword: async (req, res) => {
        const { email, token, newPassword } = req.body;
    
        try {
            if (!email || !token) {
                return res.status(400).json(ResponseDetail(400, { message: 'Email and token are required.' }));
            }
    
            const isMatch = await bcrypt.compare(email, token);
            if (!isMatch) {
                return res.status(400).json(ResponseDetail(400, { message: 'Invalid verification token.' }));
            }
    
            const user = await Account.findOne({ email });
            if (!user) {
                return res.status(404).json(ResponseDetail(404, { message: 'Tài khoản không tồn tại.' }));
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUND));
            user.password = hashedPassword;
            await user.save();
    
            return res.status(200).json(ResponseData(200, { message: 'Tài khoản đã được khôi phục.' }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseDetail(500, { message: 'Internal Server Error' }));
        }
    }

}

