import request from '@/utils/request';
export async function createContractor(data) {
  return await request({
    url: '/general-settings/contractors',
    method: 'post',
    data,
  });
}

export async function deleteContractor(contractorId) {
  return await request({
    url: `/general-settings/contractors/${contractorId}`,
    method: 'delete',
  });
}

export async function getContractors() {
  return await request({
    url: '/general-settings/contractors',
    method: 'get',
  });
}

export async function updateContractor(contractorId, data) {
  return await request({
    url: `/general-settings/contractors/${contractorId}`,
    method: 'put',
    data,
  });
}
