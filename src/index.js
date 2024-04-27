const {
    BedrockRuntimeClient,
    InvokeModelWithResponseStreamCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });

exports.handler = awslambda.streamifyResponse(
    async (event, responseStream, context) => {
        try {

            const { prompt } = JSON.parse(event.body);

            const params = {
                modelId: "amazon.titan-text-express-v1",
                contentType: "application/json",
                accept: "application/json",
                body: JSON.stringify({
                    "inputText": prompt,
                    "textGenerationConfig": {
                        "maxTokenCount": 1024,
                        "stopSequences": [],
                        "temperature": 0,
                        "topP": 1,
                    },
                }),
            };

            console.log(params);

            const command = new InvokeModelWithResponseStreamCommand(params);

            const response = await bedrock.send(command);
            const chunks = [];

            for await (const chunk of response.body) {
                const parsed = JSON.parse(
                    Buffer.from(chunk.chunk.bytes, "base64").toString("utf-8")
                );
                chunks.push(parsed.outputText);
                responseStream.write(parsed.outputText);
            }

            console.log(chunks.join(""));
            responseStream.end();

        } catch (error) {
            console.log(error);
            responseStream.write(error);
            responseStream.end();
        }
    }
);