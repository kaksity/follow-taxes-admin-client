import request from '@/utils/request';
export async function getStates() {
  return await request({
    url: '/general-settings/states',
    method: 'get',
  });
}
export async function createState(data) {
  return await request({
    url: '/general-settings/states',
    method: 'post',
    data,
  });
}
export async function deleteState(stateId) {
  return await request({
    url: `/general-settings/states/${stateId}`,
    method: 'delete',
  });
}
