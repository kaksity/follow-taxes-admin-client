export const netConfig = {
<<<<<<< HEAD
  baseURL: 'https://api.openadamawa.ng/api/v1/admin',
=======
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9000/api/v1/admin'
      : 'https://follow-taxes.herokuapp.com/api/v1/admin',
>>>>>>> d4c708347658a39b0a9c43d0ee3cee7d833f15d8
  cors: true,
  contentType: 'application/json;charset=UTF-8',
  messageDuration: 3000,
  requestTimeout: 10000,
  successCode: [200, 0],
  invalidCode: -1,
  noPermissionCode: -1,
};
