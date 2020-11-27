(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('httpie')) :
  typeof define === 'function' && define.amd ? define(['httpie'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.httpie));
}(this, (function (httpie) { 'use strict';

  httpie.get("https://github.com")
    .then((response) => console.log(response));

})));
