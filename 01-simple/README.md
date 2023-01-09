# try-lambda

Instalar serverless
npm install -g serverless

Agregar template a la carpeta
serverless create --template aws-nodejs

Probar función
sls invoke local -f hi

Crear IAM user
https://docs.aws.amazon.com/es_es/lambda/latest/dg/lambda-intro-execution-role.html
agregar el profile en serverless.yml

Configurar AWS
sls config credentials --provider aws --key ##### --secret #### --profile #######

Deploy
sls deploy --stage dev --verbose

Quitar Lambda
sls remove -s dev -r us-east-1

Monitorizar
sls --console