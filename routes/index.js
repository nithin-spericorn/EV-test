const express = require('express');
const router = express.Router();


router.use('/',require("../api/index"))
/*router.use('/api/leaders', require('../api/leaders'))
router.use('/api/tickets', require('../api/ticket'))*/


module.exports = router;
