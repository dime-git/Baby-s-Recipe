// const multer = require('multer');
// const fs = require('fs');

// const multerUsers = multer.diskStorage({
//     destination: (req, res, callback) => {
//         const path = 'public/images/users';
//         fs.mkdirSync(path,{recursive: true})
//         callback(null, path)
//     },
//     filename: (req, res, callback) => {
//         const fileName = `${req.user.id}- ${file.originalname}`;
//         callback(null, fileName)
//     }
// })

// const uploadUserImage = multer({storage: multerUsers});

// module.exports = uploadUserImage;.
const multer = require("multer");
const fs = require("fs");

const multerUser = multer.diskStorage({
    destination: function (req, file, callback) {
        const path = "public/images/users";
        fs.mkdirSync(path, { recursive: true });
        callback(null, path)
    },
    filename: function (req, file, callback) {
        const fileName = `${req.user.id}-${file.originalname}`;
        callback(null, fileName);
    }
})

const uploadUsersImage = multer({ storage: multerUser });

module.exports = uploadUsersImage;