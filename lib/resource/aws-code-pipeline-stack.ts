import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines'; 
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './pipeline-stage';
import { BuildEnvironmentVariableType } from 'aws-cdk-lib/aws-codebuild'

export class AwsCodePipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      codeBuildDefaults: { 
        buildEnvironment: {
          environmentVariables: { 
            'NO_PREBUILT_LAMBDA': 
            { type: BuildEnvironmentVariableType.PLAINTEXT, 
              value: 1 
            }
          },
        }
      },
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('Ume0344/aws-code-pipeline', 'main', {
          // we need to create aws code connection through cli.
          connectionArn: 'arn:aws:codeconnections:eu-west-1:723611335094:connection/04313928-19d3-4f43-8ff1-216bd22402f2' 
        }),
        commands: [
          'node --version',
          'npm --version',
          'npm ci',
          'npm run build',
          `npx cdk synth ${this.stackName}`],
        })
      })
    
      const developmentStage = pipeline.addStage(new MyPipelineAppStage(this, 'development', {
        env: { account: '723611335094', region: 'eu-west-1'}
      }));

      developmentStage.addPost(new ManualApprovalStep('Manual approvale before production'))

      const productionStage = pipeline.addStage(new MyPipelineAppStage(this, 'production', {
        env: { account: '723611335094', region: 'eu-west-1'}
      }));
    }
  }
