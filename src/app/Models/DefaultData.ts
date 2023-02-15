import { common } from 'app/trans';
import i18n from 'app/trans/i18n';

export const genderList = [
  // {
  //   value: null,
  //   key: 'choose_your_gender',
  // },
  {
    value: 'male',
    key: 'male',
  },
  {
    value: 'female',
    key: 'female',
  },
  {
    value: 'non binary',
    key: 'unchecked',
  },
  {
    value: 'prefer not to say',
    key: 'private',
  },
];

export type survey = 'google' | 'instargram' | 'facebook' | 'other';

export const defaultRegex = {
  phone: /^[0-9]{3}-([0-9]{3}|[0-9]{4})-[0-9]{4}$/,
  companyRegistration: /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
};

export interface dataType {
  _id: string;
  name_kr: string;
  name_eng: string;
}

export const dataListFilm: dataType[] = [
  {
    _id: 'view',
    name_kr: `${i18n.t(common.popular)}`,
    name_eng: `${i18n.t(common.popular)}`,
  },
  {
    _id: 'createdAt',
    name_kr: `${i18n.t(common.recent)}`,
    name_eng: `${i18n.t(common.recent)}`,
  },
];
