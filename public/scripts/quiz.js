$(document).ready(() => {

  // function to display a new question (ajax)

  // click on any answer
  $('div.answers button').click(function(event) {

    // add to database id of the button clicked
    const id = $(this).attr('id');
    console.log(id);



  })
})
