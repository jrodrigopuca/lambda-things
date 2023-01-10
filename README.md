# Try-Lambda
- 01-simple: Usando serverless framework
- 02-sam: Usando AWS SAM
- 03: conexión a dynamoDB

Para comprimir
zip -r lambda.zip *  

Sin layer
zip -r9 lambda.zip .

aws lambda update-function-code --function-name MY_LAMBDA --zip-file fileb://lambda.zip

