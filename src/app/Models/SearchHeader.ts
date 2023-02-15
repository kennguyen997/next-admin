import * as yup from 'yup';

export interface SearchHeaderType {
  key: string;
}

export interface HotSearchType {
  createdAt: string;
  deleted: boolean;
  deletedAt: string | null;
  name_eng: string;
  name_kr: string;
  updatedAt: string;
  _id: string;
}

export const SearchHeaderYup = yup.object().shape({
  key: yup.string(),
});
