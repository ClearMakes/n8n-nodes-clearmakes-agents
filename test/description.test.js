'use strict';

// Checks the built node and credential (run `npm run build` first).
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { ClearMakesAgents } = require('../dist/nodes/ClearMakesAgents/ClearMakesAgents.node.js');
const { ClearMakesAgentsApi } = require('../dist/credentials/ClearMakesAgentsApi.credentials.js');

const node = new ClearMakesAgents().description;
const cred = new ClearMakesAgentsApi();
const op = (value) => node.properties[0].options.find((o) => o.value === value);

test('credential sends a bearer key and tests /me', () => {
  assert.equal(cred.authenticate.properties.headers.Authorization, '=Bearer {{$credentials.apiKey}}');
  assert.equal(cred.test.request.baseURL + cred.test.request.url, 'https://agents.clearmakes.com/api/v1/brain/me');
  assert.equal(cred.properties[0].typeOptions.password, true);
});

test('ask posts the question to /ask', () => {
  const r = op('ask').routing.request;
  assert.equal(r.method, 'POST');
  assert.equal(r.url, '/ask');
  assert.match(r.body.question, /question/);
});

test('search reads /search and splits results', () => {
  const routing = op('search').routing;
  assert.equal(routing.request.url, '/search');
  assert.equal(routing.output.postReceive[0].properties.property, 'results');
});

test('only https to agents.clearmakes.com', () => {
  assert.equal(node.requestDefaults.baseURL, 'https://agents.clearmakes.com/api/v1/brain');
});
