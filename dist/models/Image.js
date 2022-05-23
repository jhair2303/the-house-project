"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongoose["default"].Schema.ObjectId;
var imageSchema = new _mongoose["default"].Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  timestamp: {
    type: Date,
    "default": Date.now
  },
  user_id: {
    type: ObjectId
  },
  image: {
    url: String,
    public_id: String
  }
});

var _default = _mongoose["default"].model("Image", imageSchema);

exports["default"] = _default;