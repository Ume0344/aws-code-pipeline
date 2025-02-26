import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { ECRDeployment, DockerImageName } from 'cdk-ecr-deployment'

export interface ImageConfig {
  stage: string
  repoName: string
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

    const ecrRepo = new ecr.Repository(this, `EcrRepo${props.config.repoName}${props.config.stage}`, {
        repositoryName: `ecr-repo-for-${props.config.repoName.toLowerCase()}-${props.config.stage}`
    })

    new ECRDeployment(this, 'DeplyDockerImageToEcr', {
      src: new DockerImageName(`${props.config.repoName}:${props.config.imageTag}`),
      dest: new DockerImageName(`${props.account}.dkr.ecr.${props.region}.amazonaws.com/${props.config.imageName}:${props.config.imageTag}`),
    })
  }
}
