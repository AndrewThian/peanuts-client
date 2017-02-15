/* globals $ */
// var API_PATH = "https://[your-peanut-api-name].herokuapp.com"
var API_PATH = "https://peanuts-clone-test.herokuapp.com"
// var API_PATH = "http://localhost:3000" // or you can test locally

$(function () {
  // when the page first loads we want to get all peanuts and display them
  listPeanuts()

  // when the submit button is clicked on the Add Form, we POST a request to create a new peanut
  $('#add-peanut').submit(function (event) {
    event.preventDefault() // stop the browser reloading
    var data = $('#add-peanut').serialize() // extract the data from the form
    $('#add-peanut').trigger('reset') // clear the form
    addPeanut(data) // call helper function that will send ajax request
  })

  // Add a click listener so we can delete peanuts
  $('main').on('click', '.delete-peanut', function () {
    var id = $(this).parent().attr('id') // find te id of the clicked peanut
    deletePeanut(id) // call helper function to delete peanut
  })
})

// GET /peanuts
function listPeanuts () {
  $.ajax({
    url: API_PATH + '/peanuts',
    type: 'GET'
  }).done(function (data) {
    console.log('success listing peanuts', data)
    $('main').empty() // clear the container of existing peanuts
    data.forEach(function (elem) {
      $('main').append('<div class="card peanut">' +
        '<div class="card-header">' + elem.name + '</div>' +
        '<div class="card-block" >' +
          '<p class="card-text">' + elem.cost + '</p>' +
            '<div class="btn-group" id="' + elem.id + '">' +
              '<button class="btn btn-danger delete-peanut">Delete</button>' +
            '</div>' +
          '</div>' +
      '</div>')
    })
  }).fail(function () {
    console.log('error listing peanuts')
  })
}

// POST /peanuts
function addPeanut (peanutData) {
  $.ajax({
    url: API_PATH + '/peanuts',
    type: 'POST',
    data: peanutData
  }).done(function (data) {
    console.log('success adding peanut')
    // if we wanted to be efficient we would just append the new peanut but for ease we will instead just re-display the list
    listPeanuts()
  }).fail(function () {
    console.log('error adding peanut')
  })
}

// DELETE /peanuts/:id
function deletePeanut (peanutId) {
  $.ajax({
    url: API_PATH + '/peanuts/' + peanutId,
    type: 'DELETE'
  }).done(function (data) {
    console.log('success deleting peanut')
    // if we wanted to be efficient we would just append the new peanut but for ease we will instead just re-display the list
    listPeanuts()
  }).fail(function () {
    console.log('error deleting peanut')
  })
}
