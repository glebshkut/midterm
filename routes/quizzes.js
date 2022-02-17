const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // get all of the quizzes
  router.get("/api", (req, res) => {
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
  // create a new quiz
  router.get("/new", (req, res) => {
    res.render("../views/create_quiz");
  });

  router.get("/quiz", (req, res) => {

    db.query(`
    SELECT name, id, subject FROM quizzes
    WHERE private = false
    ORDER BY name, subject;
    `)
      .then(data => {
        const quizzes = data.rows;
        // console.log(quizzes);

        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //gets quiz with searched term
  router.post("/search", (req, res) => {
    let searchTerm = req.body.searchTerm;
    searchTerm = "%" + searchTerm + "%";
    console.log("searchterm:", searchTerm);
    db.query(`
    SELECT name FROM quizzes
    WHERE LOWER(name) LIKE LOWER($1) OR LOWER(subject) LIKE LOWER($1)
    ORDER BY name, subject;
    `, [searchTerm])
      .then(data => {
        console.log("queried", data.rows);
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(err => {
        console.error(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // create a new quiz
  router.get("/new", (req, res) => {
    res.render("../views/create_quiz");
  });


  return router;

};



