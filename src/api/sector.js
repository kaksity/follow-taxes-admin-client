import request from '@/utils/request';

export async function createSector(data) {
  return await request({
    url: '/general-settings/sectors',
    method: 'post',
    data,
  });
}

export async function getSectors() {
  return await request({
    url: '/general-settings/sectors',
    method: 'get',
  });
}

export async function deleteSector(sectorId) {
  return await request({
    url: `/general-settings/sectors/${sectorId}`,
    method: 'delete',
  });
}
