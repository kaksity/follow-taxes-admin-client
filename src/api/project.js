import request from '@/utils/request';

export async function createProject(data) {
  return await request({
    url: '/projects',
    method: 'post',
    data,
  });
}

export async function getProjects(params = null) {
  return await request({
    url: '/projects',
    method: 'get',
    params,
  });
}

export async function deleteProject(projectId) {
  return await request({
    url: `/projects/${projectId}`,
    method: 'delete',
  });
}
