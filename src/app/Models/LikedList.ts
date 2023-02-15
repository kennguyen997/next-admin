import { StreamingType } from './Film';

export interface ItemLikedListType {
  deleted: boolean;
  isLike: boolean;
  _id: string;
  streamingID: StreamingType;
  userID: any;
}
