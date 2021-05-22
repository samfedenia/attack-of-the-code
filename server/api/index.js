const path = require('path');
const fs = require('fs');
const router = require('express').Router();
module.exports = router;


router.get('/headshots', (req, res, next) => {
    try {
        const imagesArr = [];
        const images = path.join(__dirname, '../../public/star_wars_characters');
        fs.readdir(images, (err, files) => {
            try {
              files.forEach(file => {
                  if (!file.includes('.DS_Store')) {
                      imagesArr.push(file)
                  }
              })  
            } catch (error) {
                console.log('files error', error)
            }
            res.send(imagesArr)
        })
    } catch (error) {
        next(error)
    }
})

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
