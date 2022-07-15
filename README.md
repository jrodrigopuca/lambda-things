# try-lambda

Instalar serverless
npm install -g serverless

Agregar template a la carpeta
serverless create --template aws-nodejs

Probar función
sls invoke local -f hi

Crear IAM user
agregar el profile en serverless.yml

Configurar AWS
sls config credentials --provider aws --key ##### --secret #### --profile #######

Deploy
sls deploy --stage dev --verbose

Quitar Lambda
sls remove -s dev -r us-east-1