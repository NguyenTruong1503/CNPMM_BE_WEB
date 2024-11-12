import jwt from "jsonwebtoken";

export const MiddlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      //Bearer 123456
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
        req.user = user;
        next(); // dat het dieu kien de chay tiep
      });
    } else {
      return res.status(401).json("Bạn chưa đăng nhập");
    }
  },
  //   verifyAdmin: (req, res, next) => {
  //     MiddlewareController.verifyToken(req, res, () => {
  //       if (req.user.is_admin) {
  //         next();
  //       } else {
  //         return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  //       }
  //     });
  //   },
  verifyAdmin: (req, res, next) => {
    MiddlewareController.verifyToken(req, res, () => {
      if (req.user.is_admin || req.user.accountId == req.params.id) {
        next();
      } else {
        return res.status(403).json({ message: "Bạn không có quyền truy cập" });
      }
    });
  },
};
