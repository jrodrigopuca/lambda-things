const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
const TABLE_NAME = process.env.TABLE

exports.sayHello = async (event, context) =>{

  if (process.env['AWS_SAM_LOCAL']) {
    ddb.endpoint = new AWS.Endpoint('http://dynamo:8000');
  } else if ('local' == process.env['APP_STAGE']) {
    // Use this when running code directly via node. Much faster iterations than using sam local
    ddb.endpoint = new AWS.Endpoint('http://localhost:8000');
  }
  console.log(event);
  const name= event.queryStringParameters.name;

  const user = {
    id: name,
    name: name,
    date: Date.now()
  }
  console.log("user",user)
  
  const savedUser = await saveUser(user)
  console.log("saved", savedUser)
  /*return{
    statusCode: 200,
    body: JSON.stringify(savedUser)9
  }*/
  return{
    statusCode: 200,
    body: `Hello ${name}` 
  }
}

//`Hello ${name}` 

async function saveUser(item){
  const params= {
    TableName: TABLE_NAME,
    Item: item
  }

  return dynamo.put(params).promise().then(()=>{return item})
}

//sam local invoke -e ./src/input.json SayHelloFunction
//sam local start-api
//sam local start-api -t template.yml --docker-network local-net --skip-pull-image --profile default --parameter-overrides 'ParameterKey=StageName,ParameterValue=local ParameterKey=DDBTableName,ParameterValue=local-SingleTable' 