var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');
const jwt = require('express-jwt');
const uploadUserImage = require('../utilities/upload/multerUsers');
require('dotenv').config();


/* GET users listing. */
router.get('/', controller.all)
      .get('/myprofile', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.myProfile)
      .patch('/update', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), uploadUserImage.single("image"), controller.update)
      .post('/register', controller.register)
      .post('/login', controller.login)
      .post('/logout', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.logout)


module.exports = router;
