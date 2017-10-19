
export class Chat {
  constructor(conversation_id, cs, chatIn) {
    this.conversation_id = conversation_id;
    this.cs = cs;
    this.chatIn = chatIn;
    this.request;
    this.body;
    this.input = "default";
    this.output = "default";
  }

  apiPromise() {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://www.cleverbot.com/getreply?key=CC508YHAcq5uMTjbsOZ2cOpwr5g&input=${this.chatIn}&conversation_id=${this.conversation_id}&cs=${this.cs}`;
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
    console.log("Hi!");
    promise.then(function(response) {
      this.body = JSON.parse(response);
      this.cs = this.body.cs;
      this.conversation_id = this.body.conversation_id;
      this.input = this.body.input;
      this.output = this.body.output;
      console.log(this.body.input);
    return [true];
    }, function(error) {
      return [false, error.message];
    });
  }
  getOutput() {
    return [this.input, this.output]
  }

  // getInteractions() {
  //   params = [];
  //   for (let i = 1; i <= 50; i++){
  //     if ($('this.body.interaction_' + i +'_other')) {
  //       params.push(this.body.interaction_`${i}`_other);
  //       params.push(this.body.interaction_`${i}`);
  //     } else {
  //       i += 50;
  //       break;
  //     }
  //   }
  //   return params;
  // }
}
