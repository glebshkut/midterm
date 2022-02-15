const express = require('express');
const router = express.Router();

// module.exports = (db) => {
//   router.get("", (req, res) => {
//     res.render("../views/results");
//   });
//   return router;
// };

module.exports = (db) => {
  router.get("/:id/:quizID", (req, res) => {
    const id = req.params.id;
    const quizID = req.params.quizID;
    db.query(`
  SELECT count(given_answer)as correct
FROM attempts
JOIN qas ON attempts.qa_id = qas.id
WHERE attempts.user_id = $1 AND qas.quiz_id = $2
GROUP BY attempts.given_answer
HAVING attempts.given_answer = 1;
  `, [id, quizID])
      .then(result => result.rows)
      .catch(err => null);
    res.render("../views/results");
  });
  return router;
};
