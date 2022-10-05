import { Construct } from "constructs";
import { SecurityGroup, Instance, Vpc } from "aws-cdk-lib/aws-ec2";

export default class EC2 {
  ec2Instance: Instance;
  ec2InstanceSG: SecurityGroup;

  constructor(app: Construct, id: string, vpc: Vpc) {
    const ec2InstanceName = `${id}-ec2instance`;
    const ec2SGName = `${ec2InstanceName}-sg`;

    this.ec2InstanceSG = new SecurityGroup(app, ec2SGName, {
      vpc,
      securityGroupName: ec2SGName,
    });

    // this.ec2Instance = new Instance(app, ec2InstanceName, {
    //   vpc,
    //   keyName: `${id}-ec2-keypair`,
    //   securityGroup: this.ec2InstanceSG,
    //   instanceName: ec2InstanceName,
    //   instanceType: InstanceType.of(
    //     InstanceClass.BURSTABLE2,
    //     InstanceSize.MICRO,
    //   ),
    //   vpcSubnets: {
    //     subnetType: SubnetType.PUBLIC,
    //   },
    //   machineImage: MachineImage.latestAmazonLinux({
    //     generation: AmazonLinuxGeneration.AMAZON_LINUX_2022
    //   }),
    // });
  }
}
