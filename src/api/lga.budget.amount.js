import request from '@/utils/request';
export async function getAllLGABudgetAmounts() {
  return await request({
    url: '/lga-budget-amounts',
    method: 'get',
  });
}
export async function createLGABudgetAmount(data) {
  return await request({
    url: '/lga-budget-amounts',
    method: 'post',
    data,
  });
}

export async function deleteLGABudgetAmount(lgaId) {
  return await request({
    url: `/lga-budget-amounts/${lgaId}`,
    method: 'delete',
  });
}
