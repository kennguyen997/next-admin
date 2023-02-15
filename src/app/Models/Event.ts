export interface EventType {
  _id: string;
  status: number;
  view: number;
  deleted: boolean;
  title_eng: string;
  title_kr: string;
  content_eng: string;
  content_kr: string;
  imageDomestic: string;
  imageOversea: string;
  startDate: string;
  endDate: string;
  createdBy: {
    _id: string;
    userName: string;
    userEmail: string;
  };
  createdAt: string;
  is_notice: boolean;
}

export interface ListEventType {
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  hasMore: boolean;
  docs: EventType[];
  totalDocs: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
}
