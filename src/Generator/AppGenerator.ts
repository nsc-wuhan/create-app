import Generator from "./Generator";
import { join } from "path";

export default class AppGenerator extends Generator {
  async writing() {
    this.copyDirectory({
      context: {
        version: require("../../package").version,
      },
      path: join(__dirname, "../../templates"),
      target: this.cwd,
    });
  }
}
