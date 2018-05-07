const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId; 
const models = require('@ContainerManager/app/setup');

const api = {}

api.createMap = (req, res) => {
  // email id to find user in db
  let userId = new ObjectId(req.body.userId);
  console.log("USER", userId);
  // get name, url from requirement
  let mapAttrs = {};

  mapAttrs["name"] = req.body.name;
  mapAttrs["url"] = req.body.url;
  mapAttrs["versions"] = [];
  mapAttrs["createAt"] = new Date();
  mapAttrs["lastEditAt"] = new Date();
  mapAttrs["visibility"] = 1;

  console.log("map attrs", mapAttrs);
  models.Map.create(req.body, function(err, newMap) {
    if (err) {
      console.log(err);
      return handleError(err);
      res.status(501).send(err);
    }
    // Find and update user maps
    models.User.findOne({_id: userId}, function (err, user) {
      if (err) {
        console.log(err);
        return handleError(err);
        res.status(501).send(err);
      }
      user.maps.push(newMap._id);
      // Update user in database
      user.save(function (err, updatedUser) {
        if (err) {
          console.log(err);
          return handleError(err);
          res.status(501).send(err);
        }
        res.status(201).send();
      });
    });
  })
}

module.exports = api;