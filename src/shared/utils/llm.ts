/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { fetchAuthSession } from 'aws-amplify/auth';

export const invokeModelWithStreaming = async (
  body: Record<string, any>,
  modelId: string
) => {
  const session = await fetchAuthSession();
  const region = 'us-west-2';
  const client = new BedrockRuntimeClient({
    credentials: session.credentials,
    region,
  });

  const input = {
    body: JSON.stringify(body),
    contentType: 'application/json',
    accept: 'application/json',
    modelId: modelId,
  };
  const command = new InvokeModelWithResponseStreamCommand(input);
  const response = await client.send(command);
  if (!response.body) {
    return '';
  }
  const decoder = new TextDecoder('utf-8');
  let completion = '';
  for await (const item of response.body) {
    const json_chunk = JSON.parse(decoder.decode(item!.chunk!.bytes));
    let text = '';
    if (json_chunk.type === 'content_block_start')
      text = json_chunk.content_block.text;
    if (json_chunk.type === 'content_block_delta') text = json_chunk.delta.text;
    completion += text;
    continue;
  }
  return completion;
};
