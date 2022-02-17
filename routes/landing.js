const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("touchdown");
    res.render("/", {});
  });
  return router;
};
