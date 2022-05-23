"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = random;

function random() {
  var posible = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var name = 0;

  for (var i = 0; i < 6; i++) {
    name += posible.charAt(Math.floor(Math.random() * posible.length));
  }

  return name;
}