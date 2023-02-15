import { errorMessage } from 'app/trans';
import i18n from 'app/trans/i18n';
import * as yup from 'yup';
import { defaultRegex } from './DefaultData';
export interface LoginCredentials {
  userEmail: string;
  userPassword: string;
}

export interface SignUpType {
  userEmail: string;
  userPassword: string;
}
export interface SignUpForm extends SignUpType {
  userPassword_confirmation: string;
  language: string;
  terms_of_use: boolean;
  privacy_policy: boolean;
}

export interface ResultAccount {
  userName: string;
  isEmailVerified: boolean;
  userRole: number;
  userGender: 'male' | 'female' | 'non binary' | 'prefer not to say';
  nation: {
    name: string;
    _id: string;
  };
  userDOB: null;
  avatar: string | undefined;
  isLoginKaKao: boolean;
  isLoginGoogle: boolean;
  myBookmark: any[];
  mylist: any[];
  deleted: boolean;
  deletedAt: string | null;
  language: 'ENGLISH' | 'KOREAN';
  survey: string[];
  _id: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  userID: number;
  token: string;
  typeToken: 'google' | 'kakao' | 'facebook' | 'guest';
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordForgot {
  userEmail?: string;
  newPassword: string;
  confirmPassword: string;
  UUID?: string | null;
}

export const ChangePasswordForgotYub = yup.object().shape({
  newPassword: yup.string().required().matches(defaultRegex.password),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], i18n.t(errorMessage.validate_password_not_match)),
});

export interface ConfirmCode {
  email: string;
  code: string;
}

export const ConfirmCodeYup = yup.object().shape({
  email: yup.string().required().min(5),
  code: yup.string().required().min(5),
});

export interface VerifyEmail {
  userEmail: string;
  codeOTP?: string;
}

export const VerifyEmailYup = yup.object().shape({
  userEmail: yup.string().required().email(),
  codeOTP: yup.string().required().min(6),
});

export const LoginYup = yup.object().shape({
  userEmail: yup.string().required().email(),
  userPassword: yup.string().required(i18n.t(errorMessage.er_change_password)),
});

export const SignUpYup = yup.object().shape({
  userEmail: yup.string().required().email(),
  userPassword: yup.string().required().matches(defaultRegex.password),
  userPassword_confirmation: yup
    .string()
    .oneOf([yup.ref('userPassword'), undefined], i18n.t(errorMessage.validate_password_not_match)),
  terms_of_use: yup.boolean().required().isTrue(),
  privacy_policy: yup.boolean().required().isTrue(),
});
