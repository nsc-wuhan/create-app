import { existsSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import yParser from "yargs-parser";
const args = yParser(process.argv.slice(2), {
  alias: {
    version: ["v"],
    help: ["h"],
    target: ["t"],
    name: ["n"],
    desc: ["d"],
  },
  boolean: ["version"],
});

if (args.version && !args._[0]) {
  args._[0] = "version";
  const local = existsSync(join(__dirname, "../.local"))
    ? chalk.cyan("@local")
    : "";
  const { name, version } = require("../package.json");
  console.log(`${name}@${version}${local}`);
} else {
  const targetCwd = args.target
    ? `${process.cwd()}/${args.target}`
    : process.cwd();
  require("./")
    .default({
      cwd: targetCwd,
      args,
    })
    .catch((err: Error) => {
      console.error(`Create failed, ${err.message}`);
      console.error(err);
    });
}
