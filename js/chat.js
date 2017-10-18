
export class Chat {
  constructor(conversation_id,cs) {
    this.conversation_id = conversation_id;
    this.cs = cs;
    this.chatIn = chatIn;
    this.request;
  }
  apiPromise() {
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
      params = [];
      params.push(body.conversation_id)
      params.push(body.cs)

      for (let i = 1; i <= 50; i++){
        if (body.interaction_`${i}`_other) {
          params.push(body.interaction_`${i}`_other);
          params.push(body.interaction_`${i}`);
        } else {
          i += 50;
          break;
        }
      }
      return params;
      // $('.chatLog').text(`${body.output}`);
      // cs = `${body.cs}`;
      // $('#cs_output').text(`${body.cs}`);
      // conversation_id = `${body.conversation_id}`;
      // $('#conversation_id_output').text(`${body.conversation_id}`);
      // $('#text_output').text(`interaction_1: ${body.interaction_1}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }
}
