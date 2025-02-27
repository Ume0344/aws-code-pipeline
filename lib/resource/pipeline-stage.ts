import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import { EcrStack } from './ecr-stack'; 

export class MyPipelineAppStage extends Stage {
    
    constructor(scope: Construct, stageName: string, props: StageProps) {
      super(scope, stageName, props);
  
      new EcrStack(this, `EcrStack${stageName}`, {
        account: props.env?.account,
        region: props.env?.region,
        config: {
            stage: stageName,
            imageTag: 'latest',
            imageName: 'nginx'
        }
      });      
    }
}