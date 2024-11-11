import { UserService } from "../services/UserService.js"
import { ResponseData, ResponseDetail } from "../services/ResponseJSON.js"


export const UserController = {
    getAllUsers: async (req, res) => {
        const result = await UserService.getAllUser();
        if (result.success){
            return res.status(200).json(ResponseData(200, result.data))
        }else {
            return res.status(400).json(ResponseDetail(400, { message: result.message }))
        }    
    },
    deleteUser: async (req, res) => {
        const userId = req.params.id;
        const result = await UserService.deleteUser(userId);
        if (result.success){
            return res.status(200).json(ResponseData(200, result.data))
        }else {
            return res.status(400).json(ResponseDetail(400, { message: result.message }))
        }    
    },
    updateUser: async (req, res) => {
        const userId = req.params.id;
        const userData = req.body;
        const result = await UserService.updateUser(userId, userData);
        if (result.success){
            return res.status(200).json(ResponseData(200, result.data))
        }else {
            return res.status(400).json(ResponseDetail(400, { message: result.message }))
        }    
    }
}
