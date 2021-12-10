const Recipe = require('../models/recipe');

module.exports = {

    allRecipies: async (req, res) => {
        const recipes = await Recipe.find({ user: req.user.id });

        res.send({
            error: false,
            message: 'All recipes',
            recipes: recipes
        })
    },
    myRecipe: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);

            res.send({
                error: false,
                message: "Here is your recipe!",
                recipe: recipe
            })
        }
        catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    homePage: async (req, res) => {
        try {
            const limitNumber = 4;
            const freshNew = await Recipe.find({}).sort({ createdAt: -1 }).limit(limitNumber);
            const mostPopular = await Recipe.find({}).sort({}).sort({ seen: -1 }).limit(limitNumber);

            res.send({
                error: false,
                message: 'Home page',
                freshNew: freshNew,
                mostPopular: mostPopular
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    },
    breakfast: async (req, res) => {
        try {
            const recipes = await Recipe.findOne({ category: 'Breakfast' });

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
            const recipes = await Recipe.findOne({ category: "Brunch" });

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
            const recipes = await Recipe.findOne({ category: "Lunch" });

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
            const recipes = await Recipe.findOne({ category: "Dinner" });

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
            let recipe = await Recipe.create(req.body);

            res.status(201).send({
                error: false,
                message: `${req.user.id} has created a new recipe!`,
                recipe: recipe
            })
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    },
    updateRecipe: async (req, res) => {
        try {
            await Recipe.findByIdAndUpdate(req.params.id, req.body);

            res.send({
                error: false,
                message: `${req.body.title} has been updated`
            })
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            await Recipe.findByIdAndDelete(req.params.id);

            res.send({
                error: false,
                message: 'Recipe is deleted!'
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    }
}