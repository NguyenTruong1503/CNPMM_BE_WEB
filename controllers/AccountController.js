import { AccountService } from "../services/AccountService.js";
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js";

export const AccountController = {
    createAccount: async (req, res) => {
        const accountData = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        };
        const result = await AccountService.createAccount(accountData);
        if (result.success){
            return res.status(200).json(ResponseData(200, result.data));
        }else {
            const statusCode = result.message === "Lỗi tạo tài khoản" ? 500 : 400;
            return res.status(statusCode).json(ResponseDetail(statusCode, { message: result.message }));
        }
    }    
}

