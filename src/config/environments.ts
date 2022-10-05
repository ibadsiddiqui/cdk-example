import { App } from "aws-cdk-lib";
import { ensureString } from "../utils/string";
import { BuildConfig } from "../interfaces/envs";

export function getConfig(app: App) {
  const env = app.node.tryGetContext("config");
  if (!env)
    throw new Error(
      "Context variable missing on CDK command. Pass in as `-c config=XXX`"
    );

  const unparsedEnv = app.node.tryGetContext(env);

  const buildConfig: BuildConfig = {
    AWSAccountID: ensureString(unparsedEnv, "AWSAccountID"),
    AWSProfileName: ensureString(unparsedEnv, "AWSProfileName"),
    AWSProfileRegion: ensureString(unparsedEnv, "AWSProfileRegion"),

    App: ensureString(unparsedEnv, "App"),
    Version: ensureString(unparsedEnv, "Version"),
    Environment: ensureString(unparsedEnv, "Environment"),
    Build: ensureString(unparsedEnv, "Build"),

    DATABASE_NAME: ensureString(unparsedEnv, "DATABASE_NAME"),
    DATABASE_PORT: ensureString(unparsedEnv, "DATABASE_PORT"),
    DATABASE_USERNAME: ensureString(unparsedEnv, "DATABASE_USERNAME"),
  };

  return buildConfig;
}
