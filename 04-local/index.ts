import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
export const handler = async (
	event: APIGatewayEvent,
	context: Context
): Promise<APIGatewayProxyResult> => {
	//console.log(`Event: ${JSON.stringify(event, null, 2)}`);
	//console.log(`Context: ${JSON.stringify(context, null, 2)}`);

	const body = JSON.parse(JSON.stringify(event.body || ""));
	const name = body.name ?? "";
	return {
		statusCode: 200,
		body: JSON.stringify({
			originalBody: body,
			message: `Hello ${name}`,
		}),
	};
};
