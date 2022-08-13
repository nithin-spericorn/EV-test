const jwt = require("jsonwebtoken");
const { failedResponse } = require("../helper/response");
const service = require("../api/users/service");
const {
  jwt: { secretkey },
} = require("../config");

module.exports = {
  veryfyToken: async (req, res, next) => {
    try {
      const baseUrl = ["/api"];
      const token = req.header("Authorization")
        ? req.header("Authorization").replace("Bearer ", "")
        : null;

      if (!token) {
        if (baseUrl.includes(req.baseUrl) && req.method === "GET")
          return next();
        return res.json(
          failedResponse({}, "Access denied. No token provided.", 401)
        );
      }

      let decoded = null;
      try {
        decoded = jwt.verify(token, secretkey || "secretkey");
      } catch (e) {
        return res.json(failedResponse({}, "session expired", 401));
      }

      const user = await service.find({ id: decoded.id });

      if (!user) return res.json(failedResponse({}, "Invalid Token", 401));

      req.user = decoded;

      return next();
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e.message,
        data: {},
      });
    }
  },
  verifyAdmin: (req, res, next) => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      return res
        .status(401)
        .json("sorry only admin can manupulate the article!");
    }
  },
};
