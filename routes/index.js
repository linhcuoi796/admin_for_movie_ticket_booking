const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const fs = require('fs');


const film = require('../models/film');
const category = require('../models/categories');
const {authorize, uploadFile} = require('../config_google_drive/index');


/* GET home page. */
router.get('/', async (req, res, next) => {
  const [filmData, categoryData] = await Promise.all([film.find(), category.find()]);
  res.render('film', {filmData, categoryData});
});

router.post('/new', upload.single('file'), async (req, res, next) => {

  const { title, description, director, trailer, country, premiere_date, language, status } = req.body;
  let {categories} = req.body;
  categories = categories.split(',');
  

  fs.readFile('./config_google_drive/credentials.json', async (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    const poster = await authorize(req, res, JSON.parse(content), uploadFile)
    
    const filmModal = new film({
      title, 
      description, 
      director, 
      trailer, 
      country, 
      status,
      premiere_date, 
      language, 
      categories,
      poster
    })
    await filmModal.save()
    return res.status(200).json({
      message: 'Added successful'
    })
    });//------
});


const test =  (a) => new Promise(resolve => {
    
    setTimeout(() => resolve(a), 2000);
  })








module.exports = router;
