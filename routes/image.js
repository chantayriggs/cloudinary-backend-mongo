const express = require('express');
const mongoose = require('mongoose');
const Image = require('../models/image');
const route = express.Router();

route.post('/', async (req, res) => {
  const { image_url } = req.body;
  let image = {};
  image.image_url = image_url;
  let imageModel = new Image(image);
  await imageModel.save();
  res.json(imageModel);
});

module.exports = route;



//READ ALL IMAGES

route.route('/images').get((request, response) => {
  Image.find((error, images) => {
      if (error) {
          console.log(error);
      } else {
          response.json(images);
      }
  });
});

//BRINGING BACK A SINGLE IMAGE

route.route('/:id').get((request, response) => {
  let id = request.params.id;
  Image.findById(id, (error, image) => {
      response.json(image);
  });
});

//UPDATING AN IMAGE

route.route('/update/:id').post((request, response) => {
  Image.findById(request.params.id, (error, image) => {
      if (!image)
          response.status(404).send("Data is not found");
      else
          image.image_url = request.body.image_url;

          image.save().then(image => {
              response.json('Image updated!');
          })
          .catch(error => {
              response.status(400).send("Update not possible");
          });
  });
});


// CREATING AN IMAGE

route.route('/image').post((request, response) => {
  let image = new Image(request.body);
  image.save()
      .then(image => {
          response.status(200).json({'image': 'image added successfully'});
      })
      .catch(error => {
          response.status(400).send('adding new image failed');
      });
});

// DELETE AN IMAGE

route.route("/delete/:id").delete((request, response) => {
  let id = request.params.id
  Image.findByIdAndRemove(id, (error, image) => {
      if (error) {
          response.json("Unable to delete image", error)
      } else {

          response.json("Image deleted!")
      }
  })
})