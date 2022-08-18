export const netConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1/admin' : '/api',
  cors: true,
  contentType: 'application/json;charset=UTF-8',
  messageDuration: 3000,
  requestTimeout: 10000,
  successCode: [200, 0],
  invalidCode: -1,
  noPermissionCode: -1,
};
