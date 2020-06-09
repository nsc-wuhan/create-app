"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _chalk = _interopRequireDefault(require("chalk"));

var _mustache = _interopRequireDefault(require("mustache"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _glob = _interopRequireDefault(require("glob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Generator {
  constructor({
    cwd,
    args
  }) {
    _defineProperty(this, "cwd", void 0);

    _defineProperty(this, "args", void 0);

    this.cwd = cwd;
    this.args = args;
  }

  async run() {
    await this.writing();
  }

  async writing() {}

  copyTpl(opts) {
    const tpl = (0, _fs.readFileSync)(opts.templatePath, "utf-8");

    const content = _mustache.default.render(tpl, opts.context);

    _mkdirp.default.sync((0, _path.dirname)(opts.target));

    console.log(`${_chalk.default.green("Write:")} ${(0, _path.relative)(this.cwd, opts.target)}`);
    (0, _fs.writeFileSync)(opts.target, content, "utf-8");
  }

  copyDirectory(opts) {
    const files = _glob.default.sync("**/*", {
      cwd: opts.path,
      dot: true,
      ignore: ["**/node_modules/**"]
    });

    files.forEach(file => {
      const absFile = (0, _path.join)(opts.path, file);
      if ((0, _fs.statSync)(absFile).isDirectory()) return;

      if (file.endsWith(".tpl")) {
        this.copyTpl({
          templatePath: absFile,
          target: (0, _path.join)(opts.target, file.replace(/\.tpl$/, "")),
          context: opts.context
        });
      } else {
        console.log(`${_chalk.default.green("Copy: ")} ${file}`);
        const absTarget = (0, _path.join)(opts.target, file);

        _mkdirp.default.sync((0, _path.dirname)(absTarget));

        (0, _fs.copyFileSync)(absFile, absTarget);
      }
    });
  }

}

var _default = Generator;
exports.default = _default;