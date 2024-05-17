import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';
import createError from 'http-errors';

const GRAPHQL_ENDPOINT = process.env.API_COOLWEB2_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.REGION;
const { Sha256 } = crypto;

const endpoint = new URL(GRAPHQL_ENDPOINT);

const signer = new SignatureV4({
  credentials: defaultProvider(),
  region: AWS_REGION,
  service: 'appsync',
  sha256: Sha256,
});

export const createAppsyncRequest = async (query, variables) => {
  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });
  const signed = await signer.sign(requestToBeSigned);
  return new Request(endpoint, signed);
};

export const executeRequest = async ({ query, name }, variables) => {
  const request = await createAppsyncRequest(query, variables);
  const response = await fetch(request);
  const data = await response.json();
  return data.data[name];
};

export const handleError = (error) => {
  if (createError.isHttpError(error)) {
    throw new createError(error.statusCode, error.message);
  }

  throw new createError(500, 'Failed to fetch or save data', { expose: true });
};
