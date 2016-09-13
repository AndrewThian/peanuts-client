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
})

// GET /peanuts
function listPeanuts () {
  $.ajax({
    url: 'http://localhost:3000/peanuts',
    type: 'GET'
  }).done(function (data) {
    console.log('success listing peanuts')
    $('main').empty()
    data.forEach(function (elem, index) {
      $('main').append('<div class="card"  id="' + index + '">' +
        '<div class="card-header">' + elem.name + '</div>' +
        '<div class="card-block">' + elem.cost + '</div>' +
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
