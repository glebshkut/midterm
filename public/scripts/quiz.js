$(document).ready(() => {

  const resultsPage = (resultID) => {
    $.ajax({
      url: `/results/${resultID}`,
      type: "GET",
      dataType: "html",
      success: function (data) {
        console.log("results page is loaded:");
      },
      error: function (request, error) {
        console.log("ERROR in loading results page:", error);
      }
    });
  }

  const success = () => {
    $.ajax({
      url: `/results/get_last_result`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        const resultID = JSON.stringify(data["output"]["id"]);
        console.log("Result ID: " + resultID);
        resultsPage(resultID);
      }
    });

  }

  const add_result = (quiz_id, result, maxResult) => {
    $.ajax({
      method: 'POST',
      url: `/results/add_results`,
      data: {quiz_id, result, maxResult},
      success: success()
    });
  };

  const quiz_id = window.location.pathname.split('/')[2];
  console.log("quiz_id:", quiz_id);

  let maxResult = 0;
    $.ajax({
      url : `/quiz/maxResult/${quiz_id}`,
      type : 'GET',
      dataType:'json',
      success : function(data) {
        maxResult = Number(data.maxResult.maxresult);
        console.log("maxResult:", maxResult);
      },
      error : function(request,error) {
        console.log("Request: " + JSON.stringify(request));
      }
    });

  const renderQuestion = (question, question_id) => {
    $('main#qa-content').empty();

      let result = ``;
      let answers = [question.answer_1, question.answer_2, question.answer_3, question.answer_4];
      let usedIndexes = [];
      while (usedIndexes.length < 4) {
        let randomIndex = Math.floor(Math.random() * answers.length);
        if (usedIndexes.includes(randomIndex)) {
          continue;
        };
        usedIndexes.push(randomIndex);
        result += `<button id="${randomIndex + 1}">${answers[randomIndex]}</button>`;
        result += '\n';
     }

    $('main#qa-content').append(`
    <div id="question_${question_id}" class="question">
      ${question.question}
    </div>

    <div class="answers">
      ${result}
    </div>
    `);

  }

  // function to display a new question (ajax)
  const loadQuestion = (quiz_id, question_id) => {
    $.ajax({

      url : `/quiz/api/${quiz_id}`,
      type : 'GET',
      dataType:'json',
      success : function(data) {

        // let result = JSON.stringify(data);
        // let parseResult = JSON.parse(result);
        renderQuestion(data.questions[question_id], question_id);
      },
      error : function(request,error) {
        console.log("Request: " + JSON.stringify(request));
      }
    });
  };

  // click on any answer
  $('body').on("click", "div.answers button", function(event) {

    // add to database id of the button clicked
    const id = $(this).attr('id');
    console.log("button_id:", id);

    // get number of the QAs, share it with the fuction wich displays a new question
    const question_id = Number($('div.question').attr('id').split('_')[1]) + 1;
    console.log("question_id:", question_id);

    $.ajax({
      method: 'POST',
      url: `/quiz/attempt`,
      data: {question_id, id}
    })
      .then()


    if (question_id == maxResult) {

    let result = 0;
    // get amount of correct answers
    $.ajax({
      url: `http://localhost:8080/quiz/correct_answer/${quiz_id}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        result = Number(JSON.stringify(data));
        console.log("DATA: " + result);

        add_result(quiz_id, result, maxResult);



        // clear attempts database
        $.ajax({
          method: 'POST',
          url: `/quiz/clear_attempts`,
          data: {question_id, id}
        })
          .then()
      },
      error: function (request, error) {
        console.log("ERROR: ", JSON.stringify(request));
      }
    })

    // post results to database








  } else {
    loadQuestion(quiz_id, question_id);
  }

});
});
