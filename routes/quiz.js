const express = require('express');
const router  = express.Router();

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
        // console.log(quizzes);

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
    const cookie = req.body.cookie;

    db.query(`
    INSERT INTO attempts(user_id, qa_id, given_answer) VALUES ($1, $2, $3)
    RETURNING *;
    `, [cookie, qa_id, given_answer])
      .then()
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
