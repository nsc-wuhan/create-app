"use strict";

var _fs = require("fs");

var _path = require("path");

var _chalk = _interopRequireDefault(require("chalk"));

var _yargsParser = _interopRequireDefault(require("yargs-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const args = (0, _yargsParser.default)(process.argv.slice(2), {
  alias: {
    version: ["v"],
    help: ["h"],
    target: ["t"]
  },
  boolean: ["version"]
});

if (args.version && !args._[0]) {
  args._[0] = "version";
  const local = (0, _fs.existsSync)((0, _path.join)(__dirname, "../.local")) ? _chalk.default.cyan("@local") : "";

  const {
    name,
    version
  } = require("../package.json");

  console.log(`${name}@${version}${local}`);
} else {
  const targetCwd = args.target ? `${process.cwd()}/${args.target}` : process.cwd();

  require("./").default({
    cwd: targetCwd,
    args
  }).catch(err => {
    console.error(`Create failed, ${err.message}`);
    console.error(err);
  });
}