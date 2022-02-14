$(document).ready(function () {
  $('.join-quiz-button').click(function (event) {
    event.preventDefault();
    renderQuizElements();
  });
});


const renderQuizElements = function() {
  console.log("adding quiz to html");
  // *** NEED TO ADD A FOR LOOP TO LOAD EACH QUIZ AVAILABLE (right now just loads one)***
  let $quiz = createQuizElement();
  $('.posted').prepend($quiz);
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
