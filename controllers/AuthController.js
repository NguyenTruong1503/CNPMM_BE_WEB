import { Account } from '../models/Account.js';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/AuthService.js';
import { ResponseData, ResponseDetail } from '../services/ResponseJSON.js';
import sendMail from '../services/EmailService.js'; // Đảm bảo import đúng


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
    }
}

