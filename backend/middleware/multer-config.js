const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const filename = file.originalname.split('.')[0];
        const extension = file.originalname.split('.')[1];
        const name = filename.split(' ').join('_');
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('file');