#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCodePipelineStack } from '../lib/aws-code-pipeline-stack';

const app = new cdk.App();
new AwsCodePipelineStack(app, 'AwsCodePipelineStack', {
  env: {
    account: '723611335094',
    region: 'eu-west-1',
  },
});
