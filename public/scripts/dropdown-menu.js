/* eslint-disable no-undef */
myStorage = window.sessionStorage;
$(document).ready(function () {
  $('.join-quiz').click(function (event) {
    event.preventDefault();
    renderQuizElements();
  });

  $('.new-quiz').click(function (event) {
    event.preventDefault();
    renderQuizEntry();
    $('.submit-name').on('click', function (event) {
      myStorage.setItem("quiz-name", $('.quiz-name').val());
      myStorage.setItem("quiz-subject", $('.quiz-subject').val());
    });
  });

});

const renderQuizElements = function () {
  console.log("adding quiz to html");
  console.log($('.list').is(':empty'));
  if ($('.list').is(':empty')) {
    $.ajax({

      url: '/quizzes/quiz',
      type: 'GET',
      dataType: 'json',
      success: function (data) {

        let result = JSON.stringify(data);
        let parseResult = JSON.parse(result);
        console.log(parseResult.quizzes[0].name);
        let $quiz = createQuizElement(parseResult.quizzes);
        $('.list').prepend($quiz);
        $('.posted').slideDown(400);
      },
      error: function (request, error) {
        console.log("Request: " + JSON.stringify(request));
      }
    });
  } else if ($('.posted').is(':hidden')) {
    $('.posted').slideDown(400);
  } else {
    $('.posted').slideUp(400);
  }

};

const renderQuizEntry = function () {

  if ($('.create-quiz').is(':empty')) {
    let $quizEntry = creatQuizEntry();
    $('.create-quiz').prepend($quizEntry);
    $('.create-quiz').slideDown(400);
  } else if ($('.create-quiz').is(':hidden')) {
    $('.create-quiz').slideDown(400);
  } else {
    $('.create-quiz').slideUp(400);
  }

};

const createQuizElement = function (data) {
  let list = `<ul class="quiz-list">`;
  data.forEach(quiz => {
    console.log(quiz);
    list += `<li><a href="">${quiz.name}</a></li>`;
  });

  list += `</ul>`;

  const $quiz = $(list);
  return $quiz;
};

const creatQuizEntry = function () {
  const $entry = $(`
    <form class="entry" method="GET" action="quizzes/new">
        <h6>Name</h6>
        <input placeholder="Enter quiz name here" class="quiz-name">
        <h6>Subject</h6>
        <input placeholder="enter quiz subject here" class="quiz-subject">
        <button type="submit" class="submit-name">Let's create!</button>
    <form>
  `);

  return $entry;
};
