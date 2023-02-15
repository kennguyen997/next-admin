import request from 'app/utils/request';

type ParamGetAllListStreaming = {
  limit: number;
  keySort: string | number | null;
  category?: string;
  categoryGenre?: string | number | null;
};

type GetListStreamingForEachCategory = {
  limit: number;
  page: number;
  keySort: string | number | null;
  category?: string;
  categoryGenre?: string | number | null;
};

type ParamGetDataAllEpisodesOfFilm = {
  streamingID: string;
};

type ParamGetDataDetailVote = {
  streamingID: string;
  seasonID: string;
  streamingEpisodesID: string;
};

type DataHandleChooseVote = {
  streamingID: string;
  seasonID: string;
  streamingEpisodesID: string;
  voteID: string;
  voteOptionArray: Array<string>;
};

type DataHandleCreateComment = {
  streamingID: string | undefined;
  streamingEpisodesID: string;
  content: string;
};

type ParamGetDataCommentList = {
  limit: number;
  page: number;
  keySort: string;
  streamingID: string | undefined;
  streamingEpisodesID: string;
};

type DataHandleHeartAndUnheart = {
  commentID: string;
  streamingID: string | undefined;
  streamingEpisodesID: string;
};

export async function getAllListStreaming(params: ParamGetAllListStreaming) {
  return request('/web-app/streaming/show-streaming-no-pagination', {
    method: 'GET',
    params: params,
  });
}

export async function getListStreamingForEachCategory(params: GetListStreamingForEachCategory) {
  return request('/web-app/streaming/show-streaming-pagination', {
    method: 'GET',
    params: params,
  });
}

export async function getListCategoriesGenre() {
  return request('/web-app/categories-genre/', {
    method: 'GET',
  });
}
export async function getDataDetailFilm(id: string) {
  return request(`/web-app/streaming/${id}`, {
    method: 'GET',
  });
}
export async function getDataDetailFilmHaveAuthen(id: string) {
  return request(`/web-app/streaming/authen/${id}`, {
    method: 'GET',
  });
}
export async function getDataAllEpisodesOfFilm(params: ParamGetDataAllEpisodesOfFilm) {
  return request(`/web-app/streaming/streaming-episodes/get-all-episodes-of-streaming`, {
    method: 'GET',
    params: params,
  });
}
export async function getDataAllSeasonOfFilm(params: ParamGetDataAllEpisodesOfFilm) {
  return request(`/web-app/streaming/season/get-all-season-of-streaming`, {
    method: 'GET',
    params: params,
  });
}

export async function getDataDetailSeason(id: string) {
  return request(`/web-app/streaming/season/${id}`, {
    method: 'GET',
  });
}

export async function getDataDetailVote(param: ParamGetDataDetailVote) {
  return request(`/web-app/streaming/vote/get-vote`, {
    method: 'GET',
    params: param,
  });
}
export async function getDataDetailVoteNoAuth(param: ParamGetDataDetailVote) {
  return request(`/web-app/streaming/vote/get-vote-no-authen`, {
    method: 'GET',
    params: param,
  });
}

export async function handleChooseVote(data: DataHandleChooseVote) {
  return request(`/web-app/streaming/vote/picking-vote`, {
    method: 'POST',
    data: data,
  });
}

export async function handleCreateComment(data: DataHandleCreateComment) {
  return request(`/web-app/streaming/comment/create`, {
    method: 'POST',
    data: data,
  });
}

export async function getDataCommentListHaveAuthen(param: ParamGetDataCommentList) {
  return request(`/web-app/streaming/comment/get-list-comment-by-episodes`, {
    method: 'GET',
    params: param,
  });
}

export async function getDataCommentListNoAuthen(param: ParamGetDataCommentList) {
  return request(`/web-app/streaming/comment/get-list-comment-by-episodes-no-authen`, {
    method: 'GET',
    params: param,
  });
}

export async function handleHeartAndUnheart(data: DataHandleHeartAndUnheart) {
  return request(`/web-app/streaming/comment/heart`, {
    method: 'POST',
    data: data,
  });
}

export async function handleLikeOrUnlikeFilm(data: DataHandleLikeOrUnlikeFilm) {
  return request(`/web-app/streaming/like/`, {
    method: 'POST',
    data: data,
  });
}

type DataHandleLikeOrUnlikeFilm = {
  streamingID: string;
};
export async function handleBookmarkOrUnBookmarkFilm(data: DataHandleLikeOrUnlikeFilm) {
  return request(`/web-app/streaming/bookmark/`, {
    method: 'POST',
    data: data,
  });
}
