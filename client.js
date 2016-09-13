/* globals $ */
$(function () {
  $.ajax({
    url: 'http://localhost:3000/peanuts',
    type: 'GET'
  })
    .done(function (data) {
      console.log('success')

      $('main').empty()
      data.forEach(function (elem, index) {
        $('main').append('<div class="card"  id="' + index + '">' +
          '<div class="card-header">' + elem.name + '</div>' +
          '<div class="card-block">' + elem.cost + '</div>' +
          '</div>')
      })
    })
    .fail(function () {
      console.log('error')
    })
    .always(function () {
      console.log('complete')
    })
})
