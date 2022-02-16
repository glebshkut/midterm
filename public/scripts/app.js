/* eslint-disable no-undef */
myStorage = window.sessionStorage;
const qas = {};
const quiz = {"name" : sessionStorage.getItem('quizName')};

$(document).ready(function() {

  $('.next-question').click(function(event) {
    event.preventDefault();
    qas["question"] = $('.question').val();
    console.log(qas.question);
    sessionStorage.setItem("Q1",qas);

    $('.main').slideUp(500);
    $('.main').slideDown(500);

  });
});

const getNewQuestion = function() {
  $newEntry = $(`
  <h5 class="create-quiz">Create a Quiz</h5>
  <form method="POST">
    <div class="question"><input placeholder="Type your question here" class="question-input"></div>
    <div class="correct"><input placeholder="Type the correct answer here" class="correct-input"></div>
    <div class="wrong">
      <input placeholder="Type a wrong answer here" class="wrong-input">
      <input placeholder="Type a wrong answer here" class="wrong-input">
      <input placeholder="Type a wrong answer here" class="wrong-input">
    </div>
    <div class="buttons">
      <div></div>
      <button class="next-question" type="submit">Add Question</button>
      <button class="submit-quiz" type="submit">Submit Quiz</button>
    </div>
  </form>`);
  $('.main').prepend($newEntry);
  return $newEntry;
};
