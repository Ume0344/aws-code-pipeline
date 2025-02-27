import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as path from 'path';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
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
        repositoryName: `${props.config.repoName.toLowerCase()}-${props.config.stage}`
    })

    const image = new DockerImageAsset(this, 'CDKDockerImage', {
      directory: path.join(__dirname, 'docker'),
    });

    new ECRDeployment(this, 'DeplyDockerImageToEcr', {
      src: new DockerImageName(image.imageUri),
      dest: new DockerImageName(`${ecrRepo.repositoryUri}:latest`),
    })
  }
}
