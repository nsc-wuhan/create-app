import yargs from "yargs";
import AppGenerator from "./Generator/AppGenerator";

export default async ({
  cwd,
  args,
}: {
  cwd: string;
  args: yargs.Arguments;
}) => {
  const generator = new AppGenerator({
    cwd,
    args,
  });
  await generator.run();
};
