import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { BuildConfig } from "../../src/interfaces/envs";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from "aws-cdk-lib/aws-rds";
import {
  Vpc,
  Port,
  SubnetType,
  InstanceSize,
  InstanceType,
  InstanceClass,
} from "aws-cdk-lib/aws-ec2";

export default class RDSDatabase {
  database: DatabaseInstance;

  constructor(app: Construct, buildConfig: BuildConfig, vpc: Vpc) {
    const username: string = buildConfig.DATABASE_USERNAME;
    const databaseName: string = `wdtdb${buildConfig.Environment}`;
    const databasePort: number = Number(buildConfig.DATABASE_PORT);

    const isProduction = buildConfig.Environment === "production";

    const databaseInstanceClass = InstanceClass.T3;
    const databaseInstanceSize = isProduction
      ? InstanceSize.MEDIUM
      : InstanceSize.SMALL;
    const removalPolicy = isProduction
      ? RemovalPolicy.RETAIN
      : RemovalPolicy.DESTROY;

    this.database = new DatabaseInstance(app, databaseName, {
      vpc,
      databaseName,
      multiAz: false,
      port: databasePort,
      allocatedStorage: 5,
      maxAllocatedStorage: 20,
      removalPolicy: removalPolicy,
      allowMajorVersionUpgrade: true,
      credentials: Credentials.fromGeneratedSecret(username), // Optional - will  to 'admin' username and generated password
      instanceType: InstanceType.of(
        databaseInstanceClass,
        databaseInstanceSize
      ),
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_14_3,
      }),
      cloudwatchLogsRetention: isProduction
        ? RetentionDays.ONE_WEEK
        : RetentionDays.ONE_YEAR,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
    });

    this.database.connections.allowFromAnyIpv4(Port.tcp(5432));
  }
}
