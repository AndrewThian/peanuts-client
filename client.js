/* globals $ */
$(function () {
  // when the page first loads we want to get all peanuts and display them
  listPeanuts()

  // we add form is clicked we post a request to create a new peanut
  $('#add-peanut').submit(function (event) {
    event.preventDefault() // stop the browser reloading
    var data = $('#add-peanut').serialize() // extract the data from the form
    $('#add-peanut').trigger('reset') // clear the form
    addPeanut(data) // send ajax request
  })

  // Add a click listener so we can delete peanuts
  $('main').on('click', '.delete-peanut', function () {
    var id = $(this).parent().attr('id')
    deletePeanut(id)
  })
})

// GET /peanuts
function listPeanuts () {
  $.ajax({
    url: 'http://localhost:3000/peanuts',
    type: 'GET'
  }).done(function (data) {
    console.log('success listing peanuts', data)
    $('main').empty()
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
    url: 'http://localhost:3000/peanuts',
    type: 'POST',
    data: peanutData
  }).done(function (data) {
    console.log('success adding peanut')
    // if we wanted to be efficient we would just append the new peanut but for ease we will instead just redisplay the list
    listPeanuts()
  }).fail(function () {
    console.log('error adding peanut')
  })
}

// DELETE /peanuts/:id
function deletePeanut (peanutId) {
  $.ajax({
    url: 'http://localhost:3000/peanuts/' + peanutId,
    type: 'DELETE'
  }).done(function (data) {
    console.log('success deleting peanut')
    // if we wanted to be efficient we would just append the new peanut but for ease we will instead just redisplay the list
    listPeanuts()
  }).fail(function () {
    console.log('error deleting peanut')
  })
}
