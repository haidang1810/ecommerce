const express = require('express');
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const router = express.Router();
const CampaignsController = require('../app/controllers/CampaignsController');



router.post('/add', CampaignsController.add);
// router.post('/add', checkLogin, checkRuleAdmin, CampaignsController.add);
module.exports = router;