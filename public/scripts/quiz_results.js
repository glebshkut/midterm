$(function () {
  console.log("HIIII");
  const quizResult = function () {
    console.log("quizResults!");
    $.ajax({
      url: "/results/quizID",
      type: "GET",
      dataType: "json",
      // success: function (data) {
      //   console.log("DATA: " + JSON.stringify(data));
      // },
      // error: function (request, error) {
      //   console.log("ERROR: ", error);
      // }
    })
  }
  quizResult();
})


