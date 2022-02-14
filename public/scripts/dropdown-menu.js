$(document).ready(function () {
  $('.join-quiz-button').click(function (event) {
    event.preventDefault();
    renderQuizElements();
  });

  $('.new-quiz-button').click(function (event) {
    event.preventDefault();
    renderQuizEntry();
  });
});


const renderQuizElements = function() {
  console.log("adding quiz to html");
  // *** NEED TO ADD A FOR LOOP TO LOAD EACH QUIZ AVAILABLE (right now just loads one)***
  let $quiz = createQuizElement();
  $('.posted').prepend($quiz);
  $('.posted').slideDown(400);
};

const renderQuizEntry = function () {
  console.log($('.create-quiz').length);
  if ($('.create-quiz').length === 1) {
    let $quizEntry = creatQuizEntry();
    $('.create-quiz').prepend($quizEntry);
    $('.create-quiz').slideDown(400);
  } else {
    $('.create-quiz').slideUp(400);
  }

};

const createQuizElement = function() {
  console.log("creating quiz element");
  const $quiz = $(`
    <div class="quiz">
      <a>link to quiz</a>
    </div>
  `);

  return $quiz;
};

const creatQuizEntry = function () {
  const $entry = $(`
    <form class="entry" METHOD="GET">
        <h6>Name</h6>
        <input placeholder="Enter quiz name here">
        <h6>Subject</h6>
        <input placeholder="enter quiz subject here">
    <form>
  `);
  return $entry;
};
