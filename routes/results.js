const express = require('express');
const router = express.Router();
var cookieSession = require('cookie-session');
var app = express();


module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let templateVars = {};
    const id = req.session.user_id;
    const quizID = req.params.id;
    console.log("id: ", id);
    console.log("quiz id: ", quizID);

    // const id = 1;
    // const quizID = 2;
    console.log("HELLOOO");
    db.query(`
  SELECT count(given_answer) as correct
FROM attempts
JOIN qas ON attempts.qa_id = qas.id
WHERE attempts.user_id = $1 AND qas.quiz_id = $2
GROUP BY attempts.given_answer
HAVING attempts.given_answer = 1;
  `, [id, quizID])
      .then(result => {
        const score = result.rows[0];
        templateVars = { score };
        console.log(score);
        // res.send({ result });

        res.render("results", templateVars);
      })
      .catch(err => console.log("error", err));

  });

  router.post("/add_results", (req, res) => {
    const cookie = req.session.user_id;
    const quiz_id = req.body.quiz_id;
    const result = req.body.result;
    const maxResult = req.body.maxResult;

    db.query(`
      INSERT INTO results(user_id, quiz_id, result, max_result) VALUES ($1, $2, $3, $4);
    `, [cookie, quiz_id, result, maxResult])
      .then()
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};

