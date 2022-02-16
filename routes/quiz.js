const express = require('express');
const router  = express.Router();
var cookieSession = require('cookie-session');
const { data } = require('jquery');

module.exports = (db) => {
  // attend a quiz
  router.get("/:id", (req, res) => {
    const quiz_id = req.params.id;

    db.query(`
    SELECT quizzes.subject, quizzes.name, qas.question, qas.answer_1, qas.answer_2, qas.answer_3, qas.answer_4
    FROM quizzes
    JOIN qas ON quizzes.id = qas.quiz_id
    WHERE quizzes.id = $1;
    `, [quiz_id])
      .then(data => {
        const quiz = data.rows;
        res.render("../views/quiz", { quiz });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/api/:id", (req, res) => {
    const quiz_id = req.params.id;

    db.query(`
    SELECT quizzes.subject, quizzes.name, qas.question, qas.answer_1, qas.answer_2, qas.answer_3, qas.answer_4
    FROM quizzes
    JOIN qas ON quizzes.id = qas.quiz_id
    WHERE quizzes.id = $1;
    `, [quiz_id])
      .then(data => {
        const questions = data.rows;
        res.json({questions});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/attempt", (req, res) => {
    const qa_id = req.body.question_id;
    const given_answer = req.body.id;
    const cookie = req.session.user_id;

    db.query(`
    INSERT INTO attempts(user_id, qa_id, given_answer) VALUES ($1, $2, $3)
    RETURNING *;
    `, [cookie, qa_id, given_answer])
      .then(data => console.log(data.rows[0]))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/maxResult/:id", (req, res) => {
    const quiz_id = req.params.id;

    db.query(`
    SELECT COUNT(*) as maxResult
    FROM qas
    WHERE quiz_id = $1;
    `, [quiz_id])
      .then(data => {
        const maxResult = data.rows[0];
        res.json({maxResult});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/correct_answer/:quizID", (req, res) => {
    const id = req.session.user_id;

    db.query(`
  SELECT count(*) as correct
  FROM attempts
  WHERE attempts.user_id = $1 AND attempts.given_answer = 1;
  `, [id])
      .then(result => {
        const score = result.rows[0];
        res.send(JSON.stringify(Number(score.correct)));
      })
      .catch(err => console.log("error", err));

  });

  router.post("/clear_attempts", (req, res) => {
    const cookie = req.session.user_id;

    db.query(`
    DELETE FROM attempts WHERE user_id = $1;
    `, [cookie])
      .then()
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  return router;
};
