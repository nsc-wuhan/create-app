"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Generator = _interopRequireDefault(require("./Generator"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppGenerator extends _Generator.default {
  async writing() {
    this.copyDirectory({
      context: {
        version: require("../../package").version,
        conventionRoutes: this.args.conventionRoutes
      },
      path: (0, _path.join)(__dirname, "../../templates"),
      target: this.cwd
    });
  }

}

exports.default = AppGenerator;