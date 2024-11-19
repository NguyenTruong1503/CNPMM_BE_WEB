import { Account } from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const verifyAsync = promisify(jwt.verify);

export const AuthService = {
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.JWT_ACCESS_KEY, { expiresIn: "20m" });
  },

  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.JWT_REFRESH_KEY, { expiresIn: "7d" });
  },

  loginUser: async (authData) => {
    try {
      const { username, password } = authData;
      const account = await Account.findOne({ username, isDeleted: false });
      if (!account) {
        return { success: false, message: "Tài khoản không tồn tại!" };
      }
      if (!account.is_active) {
        return { success: false, message: "Tài khoản chưa được kích hoạt!" };
      }
      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: "Tên tài khoản hoặc mật khẩu không đúng!",
        };
      }
      const data = { accountId: account.accountId, is_admin: account.is_admin };
      const accessToken = AuthService.generateAccessToken(data);
      const refreshToken = AuthService.generateRefreshToken(data);

      return { success: true, data: { account, accessToken }, refreshToken };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Lỗi đăng nhập" };
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const decodedAccount = await verifyAsync(
        refreshToken,
        process.env.JWT_REFRESH_KEY
      );
      const data = {
        accountId: decodedAccount.accountId,
        is_admin: decodedAccount.is_admin,
      };
      const accessToken = AuthService.generateAccessToken(data);
      const newRefreshToken = AuthService.generateRefreshToken(data);

      return {
        success: true,
        data: { accessToken },
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      console.error("Error verifying refresh token:", error);
      return { success: false, message: "Lỗi refresh token" };
    }
  },
};
