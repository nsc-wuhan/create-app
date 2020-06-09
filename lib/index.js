"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppGenerator = _interopRequireDefault(require("./Generator/AppGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async ({
  cwd,
  args
}) => {
  const generator = new _AppGenerator.default({
    cwd,
    args
  });
  await generator.run();
};

exports.default = _default;