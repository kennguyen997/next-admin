import * as yup from 'yup';
import { survey } from './DefaultData';
export interface VerificationType {
  userEmail: string;
  codeOTP: string;
}
export interface UpdateUserType {
  userName?: string;
  userDOB?: Date | null;
  nation?: string | null;
  userPhoneNumber?: string;
  userGender?: string | null;
  survey?: survey[];
  avatar?: File | string | null;
}
export interface NationList {
  _id: string;
  name: string;
}

export interface PresignUrlType {
  fileName: string;
  key: string;
  urlImage: string;
  urlPresigned: string;
}

export const VerificationYup = yup.object().shape({
  userEmail: yup.string().email().required(),
  codeOTP: yup.string().required().min(6),
});

export const InletChannelYup = yup.object().shape({
  survey: yup.array().required(),
});

export const UpdateUserYup = yup.object().shape({
  userName: yup.string().required(),
  userDOB: yup.date().required(),
  userGender: yup.string().required().min(0),
  nation: yup.string().required(),
});

export const ChangeUserYup = yup.object().shape({
  userName: yup.string().required(),
  userDOB: yup.date(),
  // userGender: yup.string().min(0),
  // nation: yup.string(),
});
