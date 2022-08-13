const express = require("express");
const router = express.Router();

router.use("/api/user", require("./users"));
router.use("/api/article", require("./articles"));

module.exports = router;
