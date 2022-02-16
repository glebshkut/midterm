/* eslint-disable no-undef */
myStorage = window.sessionStorage;
let qas = {};
const quizName =  sessionStorage.getItem('quizName');
const quizSubject = sessionStorage.getItem('quizSubject');
let numOfQuestions = 0;

$(document).ready(function() {

  $('body').on("click",'.next-question',function(event) {
    event.preventDefault();
    numOfQuestions += 1;
    qas["question"] = $(".question-input").val();
    qas["correct"] = $(".correct-input").val();
    qas["wrong1"] = $(".wrong-input1").val();
    qas["wrong2"] = $(".wrong-input2").val();
    qas["wrong3"] = $(".wrong-input3").val();

    sessionStorage.setItem(`Q${numOfQuestions}`,JSON.stringify(qas));
    qas = {};
    $('.main').slideUp(500);
    $('.main').empty();
    getNewQuestion();
    $('.main').slideDown(500);

  });

  $('body').on("click",'.submit-quiz',function(event) {
    event.preventDefault();

    if (numOfQuestions > 0) {
      console.log("sending ajax post to /quiz/add");
      $.ajax({
        url : '/quiz/add',
        type : 'POST',
        dataType:'json',
        data: {quizName,quizSubject},
        success : function(data) {
          console.log(JSON.stringify(data));
          let id = JSON.stringify(data);
          id = JSON.parse(id);
          id = id.id[0].id;

          while (numOfQuestions > 0) {
            if (sessionStorage[`Q${numOfQuestions}`]) {
              let questionObj = sessionStorage[`Q${numOfQuestions}`];
              questionObj = JSON.parse(questionObj);
              let question = questionObj.question;
              let correct = questionObj.correct;
              let wrong1 = questionObj.wrong1;
              let wrong2 = questionObj.wrong2;
              let wrong3 = questionObj.wrong3;
              console.log("sending ajax post to /quiz/addQuestion");
              $.ajax({
                url : '/quiz/addQuestion',
                type : 'POST',
                dataType : 'json',
                data : {id, question, correct, wrong1, wrong2, wrong3}
              });
            }
            numOfQuestions -= 1;
          }

        },
        error : function(request,error) {
          console.log("Request: " + JSON.stringify(request));
        }
      });
    }
  });
});

const getNewQuestion = function() {
  $newEntry = $(`
  <h5 class="create-quiz">Create a Quiz</h5>
  <form method="POST">
  <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
  </label>
    <div class="question"><input placeholder="Type your question here" class="question-input"></div>
    <div class="correct"><input placeholder="Type the correct answer here" class="correct-input"></div>
    <div class="wrong">
      <input placeholder="Type a wrong answer here" class="wrong-input1">
      <input placeholder="Type a wrong answer here" class="wrong-input2">
      <input placeholder="Type a wrong answer here" class="wrong-input3">
    </div>
    <div class="buttons">
      <div></div>
      <button class="next-question" type="button">Add Question</button>
      <button class="submit-quiz" type="submit">Submit Quiz</button>
    </div>
  </form>`);
  $('.main').prepend($newEntry);
};
