(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = exports.Chat = function () {
  function Chat(conversation_id, cs, chatIn) {
    _classCallCheck(this, Chat);

    this.conversation_id = conversation_id;
    this.cs = cs;
    this.chatIn = chatIn;
    this.request;
    this.body;
    this.input = "default";
    this.output = "default";
  }

  _createClass(Chat, [{
    key: "apiPromise",
    value: function apiPromise() {
      var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var url = "https://www.cleverbot.com/getreply?key=CC508YHAcq5uMTjbsOZ2cOpwr5g&input=" + this.chatIn + "&conversation_id=" + this.conversation_id + "&cs=" + this.cs;
        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        };
        request.open("GET", url, true);
        request.send();
      });
      console.log("Hi!");
      promise.then(function (response) {
        this.body = JSON.parse(response);
        this.cs = this.body.cs;
        this.conversation_id = this.body.conversation_id;
        this.input = this.body.input;
        this.output = this.body.output;
        console.log(this.body.input);
        return [true];
      }, function (error) {
        return [false, error.message];
      });
    }
  }, {
    key: "getOutput",
    value: function getOutput() {
      return [this.input, this.output];
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

  }]);

  return Chat;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _chat = require('./../js/chat.js');

var conversation_id = void 0;
var cs = void 0;
var promise = null;
var chat = null;

$(document).ready(function () {
  $('.btn').click(function (e) {
    e.preventDefault();
    var chatIn = $('#chatIn').val();
    $('#chatIn').val("");
    chat = new _chat.Chat(conversation_id, cs, chatIn);
    console.log(chat);
    chat.apiPromise();
    console.log("boo!");
    var result = chat.getOutput();
    if (result[0]) {
      var chatBack = chat.getOutput();
      $('.chatLog').text('Input: ' + chatBack[0] + ' \n Output: ' + chatBack[1]);
    } else {
      $('.showErrors').text('There was an error processing your request: ' + error.message);
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

},{"./../js/chat.js":1}]},{},[2]);
