import { Account } from '../models/Account.js';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/AuthService.js';
import { ResponseData, ResponseDetail } from '../services/ResponseJSON.js';
import sendMail from '../services/EmailService.js'; // Đảm bảo import đúng


export const AuthController = {
    createAccount: async (req, res) => {
        const { email, password, name, username } = req.body;

        if (email && password && name && username) {
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
                    password: hashedPassword
                });

                const savedUser = await newUser.save();
                const hashedEmail = await bcrypt.hash(savedUser.email, parseInt(process.env.BCRYPT_SALT_ROUND));
                const verifyUrl = `${process.env.APP_URL}/verify?email=${savedUser.email}&token=${hashedEmail}`;
                console.log(verifyUrl);
                await sendMail(savedUser.email, "Verify Email", `<a href="${verifyUrl}"> Verify </a>`);

                return res.status(201).json(ResponseData(201, { message: 'Account created successfully. Please verify your email.' }));
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
                    return res.status(200).json(ResponseData(200, { message: 'Email verified successfully. You can now log in.' }));
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
                path: '/',
                samSite: "strict"});
            return res.status(200).json(ResponseData(200, result.data));
        }else {
            return res.status(400).json(ResponseDetail(400, { message: result.message }));
        }
    }, 
    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json(ResponseDetail(401, { message: "Vui lòng đăng nhập" }));
        }
        const result = await AuthService.refreshToken(refreshToken);
        if (result && result.success) {
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: "strict"
            });
            return res.status(200).json(ResponseData(200, result.data));
        } else {
            return res.status(400).json(ResponseDetail(400, { message: result.message }));
        }
    },
    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");
        return res.status(200).json(ResponseData(200, "Đăng xuất thành công"));
    }
}

