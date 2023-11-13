require('dotenv').config()

const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY_CLOUDNARY, 
  api_secret: process.env.APY_SECRET_CLOUDNARY 
});

module.exports = cloudinary