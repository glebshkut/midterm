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

  router.post("/add", (req, res) => {
    console.log("attempting to add quiz");
    const name = req.body.quizName;
    const subject = req.body.quizSubject;
    let private = req.body.private;
    console.log("we made it");
    console.log(private);
    if (private === "true") {
      private = true;
    } else {
      private = false;
    }
    db.query(`INSERT INTO quizzes(name, subject, private) VALUES ($1, $2, $3) RETURNING id;`, [name, subject, private])
      .then(data => {
        const id = data.rows;
        res.json({id});
      })
      .catch(console.log("error adding a quiz"));
  });

  router.post("/addQuestion", (req, res) => {
    console.log("attempting to add question");
    const question = req.body.question;
    const correct = req.body.correct;
    const id = req.body.id;
    const wrong1 = req.body.wrong1;
    const wrong2 = req.body.wrong2;
    const wrong3 = req.body.wrong3;

    db.query(`INSERT INTO qas (quiz_id, question, answer_1, answer_2, answer_3, answer_4) VALUES ($1, $2, $3, $4, $5, $6)`, [id, question, correct, wrong1, wrong2, wrong3])
      .then()
      .catch(err => {
        console.log("error adding question to quiz");
        res
          .status(500)
          .json({ error: err.message});
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
