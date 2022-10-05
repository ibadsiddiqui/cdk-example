import { App, Tags } from "aws-cdk-lib";
import { MainStack } from "./stacks/main";
import { BuildConfig } from "./src/interfaces/envs";
import { getConfig } from "./src/config/environments";

const app = new App();

async function Main() {
  let buildConfig: BuildConfig = getConfig(app);

  Tags.of(app).add("App", buildConfig.App);
  Tags.of(app).add("Environment", buildConfig.Environment);

  const mainStackName = buildConfig.App + "-" + buildConfig.Environment;

  const mainStack = new MainStack(
    app,
    mainStackName,
    {
      env: {
        region: buildConfig.AWSProfileRegion,
        account: buildConfig.AWSAccountID,
      },
    },
    buildConfig
  );
}

Main();
