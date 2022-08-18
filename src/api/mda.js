import request from '@/utils/request';
export async function createMda(data) {
  return await request({
    url: '/general-settings/mdas',
    method: 'post',
    data,
  });
}

export async function deleteMda(mdaId) {
  return await request({
    url: `/general-settings/mdas/${mdaId}`,
    method: 'delete',
  });
}

export async function getMdas() {
  return await request({
    url: '/general-settings/mdas',
    method: 'get',
  });
}

export async function updateMda(mdaId, data) {
  return await request({
    url: `/general-settings/mdas/${mdaId}`,
    method: 'put',
    data,
  });
}
