const multer = require("multer");
const fs = require("fs");

const multerRecipe = multer.diskStorage({
    destination: function (req, file, callback) {
        const path = "public/images/recipes";
        fs.mkdirSync(path, { recursive: true });
        callback(null, path)
    },
    filename: function (req, file, callback) {
        const fileName = `${req.user.id}-${file.originalname}`;
        callback(null, fileName);
    }
})
const uploadRecipeImage = multer({ storage: multerRecipe });

module.exports = uploadRecipeImage;