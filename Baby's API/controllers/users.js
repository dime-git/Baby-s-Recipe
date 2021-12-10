const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    all: async (req, res) => {
        const users = await User.find();

        res.send(users);
    },
    register: async (req, res) => {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                throw new Error('This email is already taken!');
            }


            req.body.password = bcrypt.hashSync(req.body.password);
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
                throw new Error('Email does not exist');
            }

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                throw new Error(`Password doesn't match!`);
            }

            const payload = {
                id: user._id,
                email: user.email
            }

            const token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: '50m'
            });

            res.send({
                error: false,
                message: 'User logged in!',
                token: token
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
                token: token
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
            await User.findByIdAndUpdate(req.user.id, req.body);
            if (!req.body.confirmPASS === req.body.password) {
                throw new Error("Your password is not correct!")
            }

            res.send({
                error: false,
                message: `User ${req.body.first_name} has been updated!`
            })
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            })
        }
    },
    myProfile: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            res.send({
                error: false,
                message: 'My profile',
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