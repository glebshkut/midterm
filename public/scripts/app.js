/* eslint-disable no-undef */
myStorage = window.sessionStorage;
let qas = {};
const quizName =  sessionStorage.getItem('quizName');
const quizSubject = sessionStorage.getItem('quizSubject');
sessionStorage.setItem("private", "false");
let numOfQuestions = 0;

$(document).ready(function() {

  $('body').on("click", '.inner',function(event) {

    if (sessionStorage.getItem("private") === "false") {
      sessionStorage.setItem("private", "true");
      $(".private").text("Make public");
    } else {
      sessionStorage.setItem("private", false);
      $(".private").text("Make private");
    }

    console.log(sessionStorage.getItem("private"));
  });

  $('body').on("click",'.next-question',function(event) {
    event.preventDefault();
    numOfQuestions += 1;
    qas["question"] = $(".question-input").val();
    qas["correct"] = $(".correct-input").val();
    qas["wrong1"] = $(".wrong-input1").val();
    qas["wrong2"] = $(".wrong-input2").val();

    qas["wrong3"] = $(".wrong-input3").val();

    sessionStorage.setItem(`Q${numOfQuestions}`,JSON.stringify(qas));

    $('.main').slideUp(500);
    $('.question').empty();
    $('.correct').empty();
    $('.wrong').empty();
    getNewQuestion();
    $('.main').slideDown(500);
    qas = {};
  });

  $('body').on("click",'.submit-quiz',function(event) {
    event.preventDefault();

    if (numOfQuestions > 0) {
      console.log("sending ajax post to /quiz/add");
      const private = sessionStorage.getItem("private");
      console.log(private);
      $.ajax({
        url : '/quiz/add',
        type : 'POST',
        dataType:'json',
        data: {quizName,quizSubject, private},
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
          window.location.href = `/quiz/${id}`;

        },
        error : function(request,error) {
          console.log("Request: " + JSON.stringify(request));
        }
      });
    }
  });
});

const getNewQuestion = function() {
  $('.toggle').after(`
  <div class="question"><input placeholder="Type your question here" class="question-input"></div>
  <div class="correct"><input style="font-family: Rajdhani, FontAwesome;" placeholder="&#xf058 Type the correct answer here" class="correct-input"></div>
  <div class="wrong">
    <input style="font-family: Rajdhani, FontAwesome;" placeholder="&#xf057 Type a wrong answer here" class="wrong-input1">
    <input style="font-family: Rajdhani, FontAwesome;" placeholder="&#xf057 Type a wrong answer here" class="wrong-input2">
    <input style="font-family: Rajdhani, FontAwesome;" placeholder="&#xf057 Type a wrong answer here" class="wrong-input3">
  </div>`);
};

