import request from '@/utils/request';
export async function getAllBudgetItem() {
  return await request({
    url: '/budget-items',
    method: 'get',
  });
}
export async function createBudgetItem(data) {
  return await request({
    url: '/budget-items',
    method: 'post',
    data,
  });
}

export async function deleteBudgetItem(lgaId) {
  return await request({
    url: `/budget-items/${lgaId}`,
    method: 'delete',
  });
}
