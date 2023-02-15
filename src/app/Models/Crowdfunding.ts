export interface CrowdfundingType {
  _id: string;
  imageWebDomestic: string;
  imageMobileDomestic: string;
  imageWebOversea: string;
  imageMobileOversea: string;
  numberOfSponsors: number;
  achievementRate: number;
  deleted: boolean;
  status: string;
  clickCount: number;
  categoriesID: CategoriesIDType;
  title_eng: string;
  title_kr: string;
  amount_krw: number;
  amount_usd: number;
  url: string;
  updatedAt: string;
}

export interface CategoriesIDType {
  _id: string;
  name_kr: string;
  name_eng: string;
}
