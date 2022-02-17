$(() => {
  $('body').on('click', '.share-results', function() {
    let $temp = $("<input>");
    const $url = $(location).attr('href');
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    $(".share-results").text("URL copied!");
  })
})

//////
function alert() {
  let popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

