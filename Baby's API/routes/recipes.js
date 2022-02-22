var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');
const jwt = require('express-jwt');
const uploadRecipeImage = require('../utilities/upload/multerRecipes');
require('dotenv').config();

router
      .get('/myrecipes', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.getMyRecipes)
      .get('/getrecipes/:id',controller.seenRecipe)
      .get('/get/breakfast', controller.breakfast)
      .get('/get/brunch', controller.brunch)
      .get('/get/lunch', controller.lunch)
      .get('/get/dinner', controller.dinner)
      .post('/create', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), uploadRecipeImage.single("image"), controller.postRecipe)
      .get('/myrecipes/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.getRecipe)
      .patch('/myrecipes/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), uploadRecipeImage.single("image"), controller.updateRecipe)
      .delete('/myrecipes/:id', jwt({ secret: process.env.AUTH_SECRET, algorithms: ['HS256'] }), controller.deleteRecipe)
module.exports = router;