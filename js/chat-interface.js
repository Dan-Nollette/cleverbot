import { Chat } from './../js/chat.js';
let conversation_id;
let cs;

$(document).ready(function () {
  $('.btn').click(function (e) {
    e.preventDefault();
    let chatIn = $('#chatIn').val();
    $('#chatIn').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://www.cleverbot.com/getreply?key=CC508YHAcq5uMTjbsOZ2cOpwr5g&input=${chatIn}&conversation_id=${conversation_id}&cs=${cs}`;
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
      let body = JSON.parse(response);
      $('.chatLog').text(`${body.output}`);
      cs = `${body.cs}`;
      $('#cs_output').text(`${body.cs}`);
      conversation_id = `${body.conversation_id}`;
      $('#conversation_id_output').text(`${body.conversation_id}`);
      $('#text_output').text(`interaction_1: ${body.interaction_1}`);
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
