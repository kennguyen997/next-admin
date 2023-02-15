import request from 'app/utils/request';

type ParamGetDataCrowdfunding = {
  limit: number;
  page: number;
  keySort: string | number | null;
  categoriesID?: string;
  key?: string;
  sortType: string;
};

export async function getDataDataCrowdfunding(params: ParamGetDataCrowdfunding) {
  return request(`/web-app/crowdfunding/`, {
    method: 'GET',
    params: params,
  });
}

export async function addClickCountForCrowdfungding(id: string) {
  return request(`/web-app/crowdfunding/${id}`, {
    method: 'GET',
  });
}
