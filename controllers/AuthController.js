import { AuthService } from "../services/AuthService.js";
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js";

export const AuthController = {
    createAccount: async (req, res) => {
        const accountData = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
        };
        const result = await AuthService.createAccount(accountData);
        if (result.success){
            return res.status(200).json(ResponseData(200, result.data));
        }else {
            const statusCode = result.message === "Lỗi tạo tài khoản" ? 500 : 400;
            return res.status(statusCode).json(ResponseDetail(statusCode, { message: result.message }));
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
        const result = await AuthService.refreshToken(refreshToken);
        if (result.success){
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                samSite: "strict"});
            return res.status(200).json(ResponseData(200, result.data));
        }
    },
}

