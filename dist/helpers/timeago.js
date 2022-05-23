"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = time;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function time(timestamp) {
  return (0, _moment["default"])(timestamp).startOf("minute").fromNow();
}