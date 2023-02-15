import { StreamingType } from './Film';

export interface ItemBookmarkListType {
  deleted: boolean;
  isBookmark: boolean;
  _id: string;
  streamingID: StreamingType;
  userID: any;
}
