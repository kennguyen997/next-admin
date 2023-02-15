import request from 'app/utils/request';

type GetListVoted = {
  limit: number;
  page: number;
};
type GetListFilmLiked = {
  limit: number;
  page: number;
  categoriesID?: string | null;
};

type HandleUnlikedType = {
  arrayStreaming: Array<string> | [];
};
export async function getListVoted(params: GetListVoted) {
  return request('/user/vote-user/', {
    method: 'GET',
    params: params,
  });
}

export async function getListFilmLiked(params: GetListFilmLiked) {
  return request('/user/like', {
    method: 'GET',
    params: params,
  });
}

export async function getListFilmBookmark(params: GetListFilmLiked) {
  return request('/user/bookmark', {
    method: 'GET',
    params: params,
  });
}

export async function handleUnLiked(data: HandleUnlikedType) {
  return request('/user/like/unlike', {
    method: 'POST',
    data: data,
  });
}
export async function handleUnBookmark(data: HandleUnlikedType) {
  return request('/user/bookmark/unbookmark', {
    method: 'POST',
    data: data,
  });
}
