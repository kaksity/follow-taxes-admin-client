export const netConfig = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9000/api/v1/admin'
      : 'https://follow-taxes.herokuapp.com/api/v1/admin',
  cors: true,
  contentType: 'application/json;charset=UTF-8',
  messageDuration: 3000,
  requestTimeout: 10000,
  successCode: [200, 0],
  invalidCode: -1,
  noPermissionCode: -1,
};
