import { Construct } from "constructs";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";

export default class VPC {
  vpc: Vpc;

  constructor(app: Construct, id: string) {
    const vpcID = `${id}-vpc`;
    this.vpc = new Vpc(app, vpcID, {
      vpcName: vpcID,
      natGateways: 0,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: "public-subnet-1",
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: "isolated-subnet-1",
          subnetType: SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        },
      ],
    });
  }
}
