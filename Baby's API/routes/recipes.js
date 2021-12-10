var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');
const jwt = require('express-jwt');
require('dotenv').config();

router.get('/', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.allRecipies)
      .get('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.myRecipe)
      .get('/get/breakfast', controller.breakfast)
      .get('/get/brunch', controller.brunch)
      .get('/get/lunch', controller.lunch)
      .get('/get/dinner', controller.dinner)
      .post('/', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.postRecipe)
      .patch('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.updateRecipe)
      .delete('/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.deleteRecipe)
module.exports = router;