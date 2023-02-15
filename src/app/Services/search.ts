import request from 'app/utils/request';

type ParamGetDataStreamingOnSearchInPageAll = {
  limit: number;
  keySort?: string;
  key: string;
};
type ParamGetDataStreamingOnSearchInPageStreaming = {
  limit: number;
  keySort?: string;
  key: string;
  page: number;
  categoryGenre?: string | null;
  category?: string | null;
  categoriesID?: string | null;
};

export async function getDataStreamingOnSearchInPageAll(
  params: ParamGetDataStreamingOnSearchInPageAll,
) {
  return request(`/web-app/hot-search/search-streaming-no-pagination`, {
    method: 'GET',
    params: params,
  });
}

export async function getDataStreamingOnSearchInPageStreaming(
  params: ParamGetDataStreamingOnSearchInPageStreaming,
) {
  return request(`/web-app/hot-search/search-streaming-pagination`, {
    method: 'GET',
    params: params,
  });
}
export async function getDataCrowdfundingOnSearchInPageAll(
  params: ParamGetDataStreamingOnSearchInPageAll,
) {
  return request(`/web-app/hot-search/search-crowdfunding-no-pagination`, {
    method: 'GET',
    params: params,
  });
}

export async function getDataCrowdfundingOnSearchInPageCrowdfunding(
  params: ParamGetDataStreamingOnSearchInPageStreaming,
) {
  return request(`/web-app/hot-search/search-crowdfunding-pagination`, {
    method: 'GET',
    params: params,
  });
}
