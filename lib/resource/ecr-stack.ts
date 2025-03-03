import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { ECRDeployment, DockerImageName } from 'cdk-ecr-deployment'

export interface ImageConfig {
  stage: string
  imageName: string
  imageTag: string
}
export interface ImageProps extends StackProps {
  account?: string
  region?: string
  config: ImageConfig
}

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string, props: ImageProps) {
    super(scope, id, props);

    const ecrRepo = new ecr.Repository(this, `EcrRepo${props.config.imageName}${props.config.stage}`, {
        repositoryName: `${props.config.imageName.toLowerCase()}-${props.config.stage}`
    })

    // const image = new DockerImageAsset(this, 'CDKDockerImage', {
    //   directory: path.join(__dirname, 'docker'),
    // });

    new ECRDeployment(this, 'DeplyDockerImageToEcr', {
      src: new DockerImageName(`${props.config.imageName}:${props.config.imageTag}`),
      dest: new DockerImageName(`${ecrRepo.repositoryUri}:${props.config.imageTag}`),
    })

    new ecr.CfnReplicationConfiguration(this, 'EcrReplicationRule', {
      replicationConfiguration: {
        rules: [{
          destinations: [{
            region: 'eu-central-1',
            registryId: this.account,
          },
          {
            region: 'us-east-1',
            registryId: this.account,
          },
        ],
    
          // the properties below are optional
          repositoryFilters: [{
            filter: ecrRepo.repositoryName,
            filterType: 'PREFIX_MATCH'
          }],
        }],
      },
    })
  }
}
