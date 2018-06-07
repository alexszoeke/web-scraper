$(document).ready(function () {


  $.getJSON("/articles", function(data) {
    console.log(data);
    // return data;
    // For each one
    // var newDiv = $("<div>").addClass('card');
    // $(newDiv).appendTo("#articles");
    for (var i = 0; i < 15; i++) {
      // Display the apropos information on the page
      // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      $("#articles").append("<div class='card'><div class='card-body'><h5 class='card-title' data-id='" + data[i]._id + "'>" + data[i].title + "</h5><p data-toggle='modal' data-target='#notes' data-id='" + data[i]._id + "' class='card-text'>" + data[i].summary + "</p><a href='" + data[i].link +"' class='card-link'>Read more!</a>" + "</p></div></div><br>");

      console.log(data[i]);
    }
  });




  // Whenever someone clicks a p tag
  $(document).on("click", "h5", function() {
    $('#notes').modal();
    // Empty the notes from the note section
    $(".modal-body").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $(".modal-title").html( data.title);
        // An input to enter a new title
        $(".modal-body").append("<input id='titleinput' name='title' placeholder='Note Title'>");
        // A textarea to add a new note body
        $(".modal-body").append("<textarea id='bodyinput' name='body'></textarea></div>");
        // A button to submit a new note, with the id of the article saved to it
        $(".modal-footer").html("<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary' data-id='" + data._id + "' id='savenote' data-dismiss='modal'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          // Value taken from title input
          title: $("#titleinput").val(),
          // Value taken from note textarea
          body: $("#bodyinput").val()
        }
      })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $(".modal-body").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  $("#scrape").on("click", function scrape(Article) {
    $.get("/scrape", function(data) {
      window.location.reload(true);
    });
    
  });

});