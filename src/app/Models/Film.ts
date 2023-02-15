export interface CategoryType {
  _id: string;
  name_kr: string;
  name_eng: string;
}

export interface StreamingType {
  _id: string;
  status: number;
  view: number;
  amount_usd?: string;
  amount_krw?: string;
  url?: string;
  deleted: boolean;
  thumbnailImageWebDomestic: string;
  thumbnailImageMobileDomestic: string;
  thumbnailImageWebOversea: string;
  thumbnailImageMobileOversea: string;
  title_kr: string;
  title_eng: string;
  story_kr: string;
  story_eng: string;
  category: CategoryType;
  categoryGenre: CategoryType;
  createdAt: string;
  streamingID: number;
  numberOfSponsors: number;
  achievementRate: number;
  updatedAt: string;
}

export interface DetailStreamingType {
  _id: string;
  status: number;
  view: number;
  deleted: boolean;
  representativeImageWebDomestic: string;
  representativeImageMobileDomestic: string;
  representativeImageWebOversea: string;
  representativeImageMobileOversea: string;
  isbookmark: boolean;
  isLike: boolean;
  title_kr: string;
  title_eng: string;
  story_kr: string;
  story_eng: string;
  category: CategoryType;
  categoryGenre: CategoryType;
  videoRank: CategoryType;
  createdAt: string;
  updatedAt: string;
  like: number;
  bookmark: number;
  quantitySeason: number;
  quantityEpisodes: number;
  streamingID: number;
}
