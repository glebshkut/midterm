const express = require('express');
const router = express.Router();
var cookieSession = require('cookie-session');
var app = express();


module.exports = (db) => {
  router.get("/get_last_result", (req, res) => {
    console.log("something");
    db.query(`
    SELECT MAX(results.id) as id FROM results;
  `)
      .then(result => {
        const output = result.rows[0];
        res.json({output});
      })
      .catch(err => console.log("error", err));

  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    let templateVars = {};
    console.log("Inside GET RESULT PAGE");
    db.query(`
  SELECT result, quiz_id, max_result, users.username, quizzes.name as quiz_name, quizzes.subject FROM results
  JOIN quizzes ON quizzes.id = results.quiz_id
  JOIN users ON users.id = results.user_id
  WHERE results.id = $1;
  `, [id])
      .then(result => {
        const score = result.rows[0];
        templateVars = { score };
        console.log(score, "score");

        res.render("results", templateVars);
      })
      .catch(err => console.log("error", err));

  });

  router.post("/add_results", (req, res) => {
    console.log("weird string");
    console.log(req.body);
    const cookie = req.session.user_id;
    const quiz_id = req.body.quiz_id;
    const result = req.body.result;
    const maxResult = req.body.maxResult;

    db.query(`
      INSERT INTO results(user_id, quiz_id, result, max_result) VALUES ($1, $2, $3, $4);
    `, [cookie, quiz_id, result, maxResult])
      .then(() => res.status(200).send("success"))
      .catch(err => {
        console.log("failure");
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};


