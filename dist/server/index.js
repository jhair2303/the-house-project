"use strict";

var _db = require("./db.js");

var _app = _interopRequireDefault(require("./app.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _db.connectDB)();

_app["default"].listen(_app["default"].get("port"));

console.log("Server on port", _app["default"].get("port"));