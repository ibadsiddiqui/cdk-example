import VPC from "./vpc";
import RDSDatabase from "./database";
import { BuildConfig } from "../src/interfaces/envs";
import { App, Stack, StackProps } from "aws-cdk-lib";

export class MainStack extends Stack {
  constructor(
    app: App,
    id: string,
    stackProps: StackProps,
    buildConfig: BuildConfig
  ) {
    super(app, id, stackProps);

    const vpcService = new VPC(this, id);
    const database = new RDSDatabase(this, buildConfig, vpcService.vpc);
  }
}

export default MainStack;
