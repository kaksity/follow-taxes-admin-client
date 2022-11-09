import axios from 'axios';
import { netConfig } from '@/config/net.config';
const { baseURL, contentType, invalidCode, noPermissionCode, requestTimeout, successCode } =
  netConfig;
import store from '@/store/index.js';
import router from '@/router/index.js';
import { ElMessageBox, ElMessage } from 'element-plus';
import qs from 'qs';
import { setting } from '@/config/setting';
const { tokenName } = setting;
// eslint-disable-next-line no-unused-vars
let tokenLose = true;

/**
 *
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  if (code === 401) {
    router.push({ path: '/login' }).catch(() => {});
  }
  ElMessage.error(msg || `Failed with code ${code}`);
};

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
});

instance.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken']) {
      config.headers[tokenName] = store.getters['user/accessToken'];
    }
    if (
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data.message || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === 'Network Error') {
        message = 'Network error';
      }
      if (message.includes('timeout')) {
        message = 'Timeout Error';
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3);
        console.log('---===2244=', response);
        message = 'Failed request with status code of ' + code;
      }

      console.log('---===224ee4=', response);
      ElMessage.error(message || `Something went wrong`);
      return Promise.reject(error);
    }
  }
);

export default instance;
