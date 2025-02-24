## aws-code-pipeline

### Bootstrap the account
```
cdk bootstrap aws://<aws_account>/<region> --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --profile <aws_profile>
```

### Connection between AWS and Github
The connection is established using aws connections. The connection can be created;
```
aws codeconnections create-connection --provider-type GitHub --connection-name <connection_name> --profile <aws_profile>
```
Complete the [pending status to available](https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-update.html) through aws console.

## Useful commands for cdk

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
