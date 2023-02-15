import { CategoryType } from '.';

export interface VoteContentType {
  content_kr: string;
  content_eng: string;
  deleted: boolean;
  quantity: number;
  method: CategoryType;
  status: number;
  streamingEpisodesID: string;
  streamingID: string;
  startDate: string;
  endDate: string;
  title_eng: string;
  _id: string;
  title_kr: string;
}
export interface VoteOptionType {
  content_kr: string;
  content_eng: string;
  deleted: boolean;
  quantity: number;
  method: CategoryType;
  status: number;
  streamingEpisodesID: string;
  streamingID: string;
  title_eng: string;
  _id: string;
  title_kr: string;
  seasonID: string;
  isChoosen: boolean;
}

export interface VotedContentType {
  _id: string;
  quantity: number;
  status: number;
  title_kr: string;
  title_eng: string;
  startDate: string;
  streamingEpisodesID: string;
  endDate: string;
  content_kr: string;
  content_eng: string;
}

export interface VotedOptionType {
  _id: string;
  quantity: number;
  image: string;
  data_kr: string;
  data_eng: string;
}

export interface VotedType {
  _id: string;
  voteUserID: number;
  voteID: VotedContentType;
  voteOptionID: VotedOptionType;
  userID: string;
  updatedAt: string;
  streamingID: string;
  streamingEpisodesID: any;
  seasonID: string;
  deleted: boolean;
  deletedAt: any;
  createdAt: string;
}

export interface DataVoteType {
  isVote: boolean;
  vote: VoteContentType;
  voteOption: Array<VoteOptionType>;
}
