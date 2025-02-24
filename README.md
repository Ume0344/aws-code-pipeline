## aws-code-pipeline

### Bootstrap the account
```
cdk bootstrap aws://<aws_account>/<region> --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --profile <aws_profile>
```

## Useful commands for cdk

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
