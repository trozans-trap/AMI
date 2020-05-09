var express = require('express');
var router = express.Router();

//Body parser
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Admin Controller Call
const admincontroller = require('../controller/admin');


//Start Test
router.get('/trial', admincontroller.trial);
router.get('/home', admincontroller.home);

router.get('/dashboard', admincontroller.dashboard);


router.get('/login', admincontroller.getLogin);

router.post('/login',urlencodedParser,admincontroller.Login);

router.get('/signup', admincontroller.getSignup);

router.post('/signup', urlencodedParser, admincontroller.Signup);

// router.post('/login',urlencodedParser,admincontroller.Signup )



module.exports = router;