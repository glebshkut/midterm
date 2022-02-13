const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get all of the quizzes
  router.get("/", (req, res) => {
    db.query(`
    SELECT name, subject, username FROM quizzes
    JOIN users ON quizzes.user_id = users.id
    ORDER BY name, subject;
    `)
      .then(data => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
