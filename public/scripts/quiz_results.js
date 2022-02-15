$(document).ready(function () {

  const quizResult = function () {
    console.log("quizResults!");
    $.ajax({
      url: "/results/quizID",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log("DATA: " + JSON.stringify(data));
      },
      error: function (request, error) {
        console.log("REQUEST: " + JSON.stringify(request))
      }
    })
  }
})
// function quizResult() {
//   console.log("quizResults!");
//   return $.ajax({
//     url: "/:id/:quizID",
//   });
// }

