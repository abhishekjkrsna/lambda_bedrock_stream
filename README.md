## Creating Lambda Function for streaming response from AWS Bedrock

This projects AWS SAM to create a lambda for streaming response from AWS Bedrock. We will be using the Amazon Titan model as it is cheap.
The code for the project is in the src folder in the file `index.js`.

To deploy the project follow in the below steps:

- Create an IAM Role for the function. Attach Policies for AWS Bedrock and BasicLambdaExecutionPolicy.
- Paste the ARN of the IAM Role in the `template.yaml` file.
- Run the command `sam build --region us-east-1` you can also add the `--profile` option for providing credentials for the aws cli.
- After the build is complete run the command `sam deploy -g --region us-east-1`.
- It will deploy the lambda function and provide you the function url.
- Paste the function url in the `index.html` file, and you are ready to test your function.
- You can also use `curl -k` to test your function.