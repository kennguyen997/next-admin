import { ChangePasswordForgot, VerifyEmail } from 'app/Models';
import i18n from 'app/trans/i18n';
import request from 'app/utils/request';

export async function verifyEmail(verifyEmailForm: VerifyEmail) {
  return request('/user/validate-email', {
    method: 'POST',
    data: {
      ...verifyEmailForm,
      language: i18n.language,
    },
  });
}

export async function sendOtpForgotPassword(verifyEmailForm: VerifyEmail) {
  return request('/user/send-otp-forgot-password', {
    method: 'POST',
    data: {
      ...verifyEmailForm,
      language: i18n.language,
    },
  });
}

export async function checkOtpForgoPassword(verifyEmailForm: VerifyEmail) {
  return request('/user/check-otp-forgot-password', {
    method: 'POST',
    data: {
      ...verifyEmailForm,
      language: i18n.language,
    },
  });
}

export async function changePasswordForgot(data: ChangePasswordForgot) {
  return request('/user/reset-password', {
    method: 'PATCH',
    data: {
      ...data,
      language: i18n.language,
    },
  });
}
