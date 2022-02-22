const User = require('../models/user');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Recipe = require ("../models/recipe");

require('dotenv').config();

module.exports = {
    all: async (req, res) => {
        try {
            let recipes = await Recipe.find();
            let NewRecipes = recipes.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
            let PopularRecipes = recipes.sort((a, b) => b.views - a.views).slice(0, 6);
            res.send({
                err: false,
                message: "List of recipes",
                most_popular: PopularRecipes,
                fresh_new: NewRecipes
            });
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            });
        }
    },
    register: async (req, res) => {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                throw new Error('This email is taken!');
            } else {
                req.body.image = 'https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg';
            }
            user = await User.create(req.body);
            res.send({
                error: false,
                message: 'New user record created!',
                user: user
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const payload = {
                id: user._id,
                email: user.email
            }

            const token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: '1d'
            });

            res.send({
                error: false,
                message: 'User logged in!',
                token: token,
                password: user.password
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    logout: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        try {
            const payload = {
                id: user._id,
                email: user.email
            }

            const token = jwt.sign(payload, 'Invalid key', {
                expiresIn: '1'
            });

            res.send({
                error: false,
                message: 'User logged out!',
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    update: async (req, res) => {
        try {
            let user = await User.findById(req.user.id)
            if (req.file) {
                req.body.image = `images/users/${req.file.filename}`
            } else {
                req.body.image = user.image
            }
            user = await User.findByIdAndUpdate(req.user.id, req.body)
            res.send({
                err: false,
                message: 'User informations are updated'
            })
        }
        catch (err) {
            res.send({ 
                err: true,
                message: err.message
            })
        }
    },
    myProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            res.send({
                error: false,
                message: 'My profile info',
                user: user
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    }
}