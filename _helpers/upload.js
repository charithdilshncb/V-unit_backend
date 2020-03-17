const config = require('config.json');
const express = require('express');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
cloud_name: vunitcloud,
api_key:585223452628835,
api_secret: ytaqrYIFSTF191xSmaoVo44vmMw
});

const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "demo",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

app.post('/api/images', parser.single("image"), (req, res) => {
  console.log('fhfhfhgf');
  console.log(req.file) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;

  Image.create(image) // save image information in database
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err));
});