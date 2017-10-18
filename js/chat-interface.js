import { Chat } from './../js/chat.js';

$(document).ready(function () {
  $('.btn').click(function (e) {
    e.preventDefault();
    let chatIn = $('#chatIn').val();
    $('#chatIn').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://www.cleverbot.com/getreply?key=CC508YHAcq5uMTjbsOZ2cOpwr5g`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      body = JSON.parse(response);
      $('.chatLog').text(`${body.output}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });

    let chatOutput =
    $('#chatLog').text(chatOutput);
    // let obj = new Obj(numberIn);
    // let numberOut = obj.func();
    // console.log(numberIn, numberOut);
    // $('#numberOut').text(numberOut);
  });
});
