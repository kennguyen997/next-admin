import request from 'app/utils/request';

type ParamGetDataCrowdfunding = {
  limit: number;
};

export async function getDataPopular(params: ParamGetDataCrowdfunding) {
  return request(`/web-app/popular-content`, {
    method: 'GET',
    params: params,
  });
}
export async function getDataBanner() {
  return request(`/web-app/banner`, {
    method: 'GET',
  });
}
