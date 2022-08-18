import request from '@/utils/request';
export async function getAllLGAs(stateId = null) {
  return await request({
    url: '/general-settings/lgas',
    method: 'get',
    params: {
      state_id: stateId,
    },
  });
}
export async function createLGA(data) {
  return await request({
    url: '/general-settings/lgas',
    method: 'post',
    data,
  });
}

export async function deleteLGA(lgaId) {
  return await request({
    url: `/general-settings/lgas/${lgaId}`,
    method: 'delete',
  });
}
