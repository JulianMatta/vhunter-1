// Import external modules
let { app } = require('../../src/core/app');
const fixtures = require('../utils/fixtures.json');
// Mocks
const { requestScheme, responseScheme } = require('../mocks/index');
const HighlightRoute = {
  url: '/highlight/v1/contents',
  method: 'GET',
};
const contentId = '301653760800';
beforeAll(async () => {
  app = await app();
});
const env = process.env.NODE_ENV || 'local';
const headers = {
  Authorization: 'Bearer ' + fixtures[env].token,
};
describe('Schemes test', () => {
  test('GET /v1/contents/301653760800', async () => {
    jest.setTimeout(10000);
    const response = await app.inject({
      method: HighlightRoute.method,
      url: `${HighlightRoute.url}/${contentId}`,
      headers,
      query: {
        ...requestScheme.successCase,
      },
    });
    const responseParsed = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(responseParsed).toBeDefined();
    expect(Object.keys(responseParsed.stripes[0])).toEqual([
      'name',
      'contents',
    ]);
    expect(responseParsed.stripes.length > 0).toBeTruthy();
    const ContentResponse = responseParsed.stripes[0].contents[0];
    expect(Object.keys(ContentResponse)).toEqual(
      responseScheme.HighlightExpectResponse,
    );
  });
  test('GET /v1/contents/301653760800 200', async () => {
    const response = await app.inject({
      method: HighlightRoute.method,
      url: `${HighlightRoute.url}/${contentId}`,
      query: requestScheme.successCase,
      headers,
    });
    const responseParsed = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(responseParsed).toBeDefined();
    expect(Object.keys(responseParsed.stripes[0])).toEqual([
      'name',
      'contents',
    ]);
  });
  test('GET /v1/contents/301653760800 401 invalid token', async () => {
    const response = await app.inject({
      method: HighlightRoute.method,
      url: `${HighlightRoute.url}/${contentId}`,
      headers: {
        Authorization: 'Bearer scasndbjabdjhasbdhjasbjhnaksbdkjabhjda',
      },
      query: requestScheme.successCase,
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatch(/Unauthorized/);
  });
});
