const express = require('express');
const checkLogin = require('../app/middleware/checkLogin');
const checkRuleAdmin = require('../app/middleware/checkRuleAdmin');
const router = express.Router();
const CampaignsController = require('../app/controllers/CampaignsController');

router.post('/add', checkLogin, checkRuleAdmin, CampaignsController.add);
router.get('/getAll', checkLogin, checkRuleAdmin, CampaignsController.getAll);
router.get('/getById/:id', checkLogin, checkRuleAdmin, CampaignsController.getById);
module.exports = router;