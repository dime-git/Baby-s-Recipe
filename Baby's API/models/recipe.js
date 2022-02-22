const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    preparation_time: {
        type: Number,
        required: true
    },
    number_of_people: {
        type: Number,
        required: true
    },
        short_description: {
        type: String,
        required: true
    },
    seen: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
    }
}, { timestamps: true })
module.exports = mongoose.model('recipe', recipeSchema);