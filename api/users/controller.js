const { failedResponse, goodResponse } = require("../../helper/response");
const bcryptjs = require("bcryptjs");
const service = require("./service");
const { Op } = require("sequelize");
const db = require("../../db/models");
const jwt = require("jsonwebtoken");
const {
  jwt: { secretkey },
} = require("../../config");

(exports.addUsers = async (req, res) => {
  try {
    console.log("HELOOOOO...#######");
    const salt = await bcryptjs.genSalt(10);
    let users = [
      {
        email: "Joseph@gmail.com",
        password: await bcryptjs.hash("password", salt),
        isAdmin: true,
      },
      {
        email: "admin@gmail.com",
        password: await bcryptjs.hash("admin", salt),
        isAdmin: true,
      },
    ];

    const exist = await db.users.findOne({
      where: { email: req.body.email || "" },
    });
    if (!exist) {
      console.log("KKKK");
      if (req.body) {
        await db.users.create({
          email: req.body.email,
          password: await bcryptjs.hash(req.body.password, salt),
          isAdmin: req.body.isAdmin,
        });
      } else {
        await db.users.create(users);
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }
    /*for (i = 0; i < users.length; i++) {
      console.log(users[1]);

    await service.create({
        email: users[i].email,
        password: users[i].password,
        isAdmin:users[i].isAdmin
      });
    }  ///   we can check first if the user exist or 
    //not.now i am not checking i mainly concentrate on the main functionality
*/
    return res.json(goodResponse({}, "Users successfully stored in database"));
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
      data: {},
    });
  }
}),
  (exports.login = async (req, res) => {
    try {
      let { email, password } = req.body;
      console.log("entered", req.body);
      const user = await db.users.findOne({ email: email });
      console.log("hhhhh");
      if (!user) {
        res.status(200).json({
          success: false,
          message: "No User Found",
        });
      } else {
        console.log("else part");
        bcryptjs.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                id: user.id,
                isAdmin: user.isAdmin,
              },
              secretkey || "secretkey",
              { expiresIn: "3d" }
            );
            res.status(200).json({
              success: true,
              message: "authentication successfull",
              token: token,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "invalid credentials",
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  });
