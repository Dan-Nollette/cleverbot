import { Chat } from './../js/chat.js';
let conversation_id;
let cs;
let promise = null;
let chat = null;

$(document).ready(function () {
  $('.btn').click(function (e) {
    e.preventDefault();
    let chatIn = $('#chatIn').val();
    $('#chatIn').val("");
    chat = new Chat(conversation_id, cs, chatIn);
    console.log(chat);
    chat.apiPromise();
    console.log("boo!");
    let result = chat.getOutput();
    if (result[0]) {
      let chatBack = chat.getOutput()
      $('.chatLog').text(`Input: ${chatBack[0]} \n Output: ${chatBack[1]}`);
    } else {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    }

    // promise.then(function(response) {
    //   let body = JSON.parse(response);
    //   $('.chatLog').text(`${body.output}`);
    //   cs = `${body.cs}`;
    //   $('#cs_output').text(`${body.cs}`);
    //   conversation_id = `${body.conversation_id}`;
    //   $('#conversation_id_output').text(`${body.conversation_id}`);
    //   $('#text_output').text(`interaction_1: ${body.interaction_1}`);
    // }, function(error) {
    //
    // });

  });
});
