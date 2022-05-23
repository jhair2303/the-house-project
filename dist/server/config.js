"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var config = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/testdb",
  PORT: process.env.PORT || 3333,
  USER: process.env.USER,
  PASS: process.env.PASS,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET
};
var _default = config;
exports["default"] = _default;