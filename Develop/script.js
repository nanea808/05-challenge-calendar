// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var containerDiv = $('body').children().eq(1).children();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var textByTime = {
    // AM
    1: "", 2: "", 3: "", 4: "", 5 : "", 6 : "",
    7: "", 8: "", 9: "", 10: "", 11: "", 12: "",
    // PM
    13: "", 14: "", 15: "", 16: "", 17: "", 18: "",
    19: "", 20: "", 21: "", 22: "", 23: "", 24: ""
  }
  if (localStorage.getItem("textBoxes")) {
    textByTime = JSON.parse(localStorage.getItem("textBoxes"));
    for (var x = 1; x < 25; x++) {
      $('#hour-' + (x)).children().eq(1).val(textByTime[x]);
    }
  }
  
  containerDiv.click(function (event) {
    var el = event.target;
    var id = event.currentTarget.getAttribute("id");
    var textBox = $('#' + id).children().eq(1);

    if (el.matches("i") || el.matches("button")) {
      var num;
      if (id.length > 6) {
        num = id.slice(-2);
      } else num = id.slice(-1);

      textByTime[num] = textBox.val();
      localStorage.setItem("textBoxes", JSON.stringify(textByTime));
    }
  })
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var hour = dayjs().format('H');
  $('#hour-' + hour).addClass('present');

  for (var x = parseInt(hour) + 1; x < 25; x++) {
    $('#hour-' + x).addClass('future');
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
