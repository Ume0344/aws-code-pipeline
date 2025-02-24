import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

export interface ImageConfig {
    stage: string
    repoName: string
    imageName: string
    imageTag: string
}
export interface ImageProps extends StackProps {
    config: ImageConfig
  }

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string, props: ImageProps) {
    super(scope, id, props);

    const ecrRepo = new ecr.Repository(this, `EcrRepo${props.config.repoName}${props.config.stage}`, {
        repositoryName: `ecr-repo-for-${props.config.repoName.toLowerCase()}-${props.config.stage}`
    })
  }
}