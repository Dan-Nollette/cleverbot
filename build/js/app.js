(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = exports.Chat = function () {
  function Chat(number) {
    _classCallCheck(this, Chat);

    number = parseInt(number);
    this.number = number;
  }

  _createClass(Chat, [{
    key: "func",
    value: function func() {
      return this.number += 1;
    }
  }]);

  return Chat;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _chat = require('./../js/chat.js');

$(document).ready(function () {
  $('.btn').click(function (e) {
    e.preventDefault();
    var chatIn = $('#chatIn').val();
    $('#chatIn').val("");

    var promise = new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      var url = 'https://www.cleverbot.com/getreply?key=CC508YHAcq5uMTjbsOZ2cOpwr5g';
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

    promise.then(function (response) {
      var body = JSON.parse(response);
      $('.chatLog').text('' + body.output);
    }, function (error) {
      $('.showErrors').text('There was an error processing your request: ' + error.message);
    });

    var chatOutput = $('#chatLog').text(chatOutput);
    // let obj = new Obj(numberIn);
    // let numberOut = obj.func();
    // console.log(numberIn, numberOut);
    // $('#numberOut').text(numberOut);
  });
});

},{"./../js/chat.js":1}]},{},[2]);
