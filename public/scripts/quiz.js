$(document).ready(() => {

  // get Cookie function
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const renderQuestion = (question, question_id) => {
    console.log(question, question_id);
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
        console.log(question_id);
        console.log(data.questions[question_id], question_id);
        renderQuestion(data.questions[question_id], question_id);
      },
      error : function(request,error) {
        console.log("Request: " + JSON.stringify(request));
      }
    });
  }

  // click on any answer
  $('body').on("click", "div.answers button", function(event) {

    // add to database id of the button clicked
    const id = $(this).attr('id');
    console.log("button_id:", id);

    // get number of the QAs, share it with the fuction wich displays a new question
    const question_id = Number($('div.question').attr('id').split('_')[1]) + 1;
    console.log("question_id:", question_id);

    const cookie = getCookie('user_id');
    console.log("user_id:", cookie);

    $.ajax({
      method: 'POST',
      url: `/quiz/attempt`,
      data: {question_id, id, cookie}
    })
      .then(() => {

      })

    const quiz_id = window.location.pathname.split('/')[2];
    console.log("quiz_id:", quiz_id);

    loadQuestion(quiz_id, question_id);
  })
})
