const Recipe = require('../models/recipe');
const fs = require('fs')

module.exports = {

    home: async (req, res) => {
        try {
            const limitNumber = 4;
            const fresh_new = await Recipe.find({}).sort({ createdAt: -1 }).limit(limitNumber);
            const most_popular = await Recipe.find({}).sort({}).sort({ seen: -1 }).limit(limitNumber);

            res.send({
                error: false,
                message: 'Here is yout list of recipes',
                most_popular: most_popular,
                fresh_new: fresh_new
            })
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    },
    getRecipe: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            res.send({
                err: false,
                message: `My recipe`,
                recipe: recipe
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getMyRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.find({ user: req.user.id });
            res.send({
                error: false,
                message: `List of recipes`,
                recipes: recipes
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    seenRecipe: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            await Recipe.findByIdAndUpdate(recipe._id,{seen: recipe.seen+=1})
            res.send({
                err: false,
                message: "Your recipe has been seen",
                recipe: recipe
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    breakfast: async (req, res) => {
        try {
            const recipes = await Recipe.find({ category: 'Breakfast' });

            res.send({
                error: false,
                message: 'Breakfast list',
                recipes: recipes
            })
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    brunch: async (req, res) => {
        try {
            const recipes = await Recipe.find({ category: "Brunch" });
            res.send({
                error: false,
                message: 'Brunch list',
                recipes: recipes
            })
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    lunch: async (req, res) => {
        try {
            const recipes = await Recipe.find({ category: "Lunch" });

            res.send({
                error: false,
                message: 'Lunch list',
                recipes: recipes
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    dinner: async (req, res) => {
        try {
            const recipes = await Recipe.find({ category: "Dinner" });

            res.send({
                error: false,
                message: `Dinner list`,
                recipes: recipes
            })
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    postRecipe: async (req, res) => {
        try {
            req.body.user = req.user.id;
            if (req.file) { req.body.image = `images/recipes/${req.file.filename}` }
            else { req.body.image = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-keto-pizza-073-1544039876.jpg?crop=0.668xw:1.00xh;0.233xw,0.00255xh&resize=980:*" };
            let recipe = await Recipe.create(req.body)
            res.send({
                error: false,
                message: 'New recipe created',
                recipe: recipe
            })
        }
        catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    },
    updateRecipe: async (req, res) => {
        try {
            req.body.user = req.user.id;
            const recipe = await Recipe.findById(req.params.id);
            if (req.file) {
                req.body.image = `images/recipes/${req.file.filename}`;
                recipeByImage = await Recipe.find({ image: recipe.image });
                if (recipeByImage.length === 1 && req.body.image !== recipe.image && recipe.image !== "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-keto-pizza-073-1544039876.jpg?crop=0.668xw:1.00xh;0.233xw,0.00255xh&resize=980:*") {
                    fs.unlinkSync(`public/${recipe.image}`)
                }
            } else {
                req.body.image = recipe.image
            }
            await Recipe.findByIdAndUpdate(req.params.id, req.body)
            res.send({
                err: false,
                message: 'Your recipe has been updated'
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message,
            })
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            recipeByImage = await Recipe.find({ image: recipe.image });
            if (recipeByImage.length === 1 && recipe.image !== "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-keto-pizza-073-1544039876.jpg?crop=0.668xw:1.00xh;0.233xw,0.00255xh&resize=980:*") { fs.unlinkSync(`public/${recipe.image}`) };
            await Recipe.deleteOne({ _id: req.params.id })
            res.send({
                err: false,
                message: "Your recipe has been deleted"
            });
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    }
}