# Try-Lambda

- 01-simple: Usando serverless framework
- 02-sam: Usando AWS SAM
- 03-dynamo: conexión a dynamoDB
- 04-localstack

Para comprimir
zip -r lambda.zip \*

Sin layer
zip -r9 lambda.zip .

aws lambda update-function-code --function-name MY_LAMBDA --zip-file fileb://lambda.zip

# Usando LocalStack

localstack start -d
localstack status services

http://localhost:4566/health

https://app.localstack.cloud/inst/default/resources/iam/users/new
