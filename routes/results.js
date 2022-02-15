const express = require('express');
const router = express.Router();

// module.exports = (db) => {
//   router.get("", (req, res) => {
//     res.render("../views/results");
//   });
//   return router;
// };

module.exports = (db) => {
  router.get("/quizID", (req, res) => {
    const id = 1;
    const quizID = 2;
    console.log("HELLOOO");
    db.query(`
  SELECT count(given_answer)as correct
FROM attempts;

  `)
      .then(result => {
        const score = result.rows;
        console.log(score);
        res.send({ result })

      })
      .catch(err => console.log("error", err));
    res.render("../views/results");
  });
  return router;
};


// JOIN qas ON attempts.qa_id = qas.id
// WHERE attempts.user_id = $1 AND qas.quiz_id = $2
// GROUP BY attempts.given_answer
// HAVING attempts.given_answer = 1;

// [id, quizID]
