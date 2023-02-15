import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  LoginCredentials,
  SignUpType,
  ResultAccount,
  ChangePassword,
  VerifyEmail,
  ChangePasswordForgot,
} from '../../Models/Account';
import qs from 'qs';
import i18next from 'i18next';
import { NationList, PresignUrlType, UpdateUserType, VerificationType } from '@/app/Models';
import moment from 'moment';
import { ApplyType } from '@/app/Models/Apply';
import { HotSearchType } from '@/app/Models/SearchHeader';
import Toastconfig from '@/assets/toast';
export class AccountGateway {
  private restConnector: AxiosInstance;

  constructor(restConnector: AxiosInstance) {
    this.restConnector = restConnector;
  }
  async login(loginForm: LoginCredentials): Promise<{ token: string }> {
    try {
      const {
        data: { data },
      } = await this.restConnector.post('/user/login', {
        ...loginForm,
        language: i18next.language,
        typeDevice: 'web',
        deviceToken: '',
      });
      return data;
    } catch (error: any) {
      Toastconfig.error(error?.response?.data?.errorList[0]);
      return { token: '' };
    }
  }

  async sendOtpForgotPassword(
    verifyEmailForm: VerifyEmail,
  ): Promise<{ status: boolean; sendOTP: boolean; msg: string }> {
    try {
      const response = await this.restConnector.post('/user/send-otp-forgot-password', {
        ...verifyEmailForm,
        language: i18next.language,
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async changePasswordForgot(changePasswordForm: ChangePasswordForgot): Promise<{ token: string }> {
    try {
      const {
        data: { data },
      } = await this.restConnector.post('/user/reset-password', {
        ...changePasswordForm,
        language: i18next.language,
      });
      return data;
    } catch (error: any) {
      return { token: '' };
    }
  }

  async loginGoogle(googleToken: string): Promise<string> {
    try {
      const {
        data: { data },
      } = await this.restConnector.post('/user/login/google', {
        googleToken: googleToken,
        language: i18next.language,
        typeDevice: 'web',
        deviceToken: '',
      });
      return data.token;
    } catch (error: any) {
      Toastconfig.error(error.response.data.errorList[0]);
      return '';
    }
  }

  async getTokenKakao(): Promise<string | undefined> {
    const REDIRECT_URI = `${window.location.origin}/oauth/kakao/callback`;
    const code = new URL(window.location.href).searchParams.get('code');
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: process.env.REACT_APP_CLIENT_SECRET_KEY,
    });
    try {
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
      return res.data.access_token as string;
    } catch (error: any) {
      Toastconfig.error(error.response.data.error_description);
      throw error;
    }
  }

  async loginKakao(kakaoToken: string): Promise<string> {
    try {
      const {
        data: { data },
      } = await this.restConnector.post('/user/login/kakao', {
        kakaoToken: kakaoToken,
        language: i18next.language,
        typeDevice: 'web',
        deviceToken: '',
      });
      return data.token;
    } catch (error: any) {
      Toastconfig.error(error.response.data.errorList[0]);
      throw error;
    }
  }

  async signUp(signUpForm: SignUpType): Promise<ResultAccount> {
    try {
      const { data } = await this.restConnector.post('/user/register', {
        ...signUpForm,
        language: i18next.language,
      });
      return data.data;
    } catch (error: any) {
      console.log(error.response.data.errorList);
      Toastconfig.error(error.response.data.errorList[0]);
      throw error;
    }
  }

  async checkUserEmail(userEmail: string) {
    try {
      const temp = { userEmail: userEmail, language: i18next.language };
      const { data } = await this.restConnector.post('/user/check-email-exist', temp);
      console.log(data);
      if (!data.existEmail) return data;
      await this.resendOTP(userEmail);
      return data;
    } catch (error: any) {
      Toastconfig.error(error.response.data.errorList[0]);
      return;
    }
  }

  async checkOtpVerify(verification: VerificationType) {
    try {
      const temp = { ...verification, language: i18next.language };
      const { data } = await this.restConnector
        .post('/user/check-otp-verify', temp)
        .then((data) => data.data);
      return data;
    } catch (error: any) {
      Toastconfig.error(error.response.data.msg);
      return;
    }
  }

  async resendOTP(userEmail: string) {
    try {
      const temp = { userEmail, language: i18next.language };
      const { data } = await this.restConnector.post('/user/send-otp', temp);
      if (data && data.status) {
        Toastconfig.success(data.msg);
        return data;
      }
      Toastconfig.error(data?.msg);
      return;
    } catch (error: any) {
      Toastconfig.error(error.response?.data?.errorList[0]);
      return;
    }
  }
  async logout() {
    try {
      const { data } = await this.restConnector.post('/user/logout');
      // data && Toastconfig.success(data.msg);
      return data;
    } catch (error: any) {
      console.log(error.response.data.error);
      // Toastconfig.error(error.response.data.error);
      return;
    }
  }

  async getLoginUser(): Promise<ResultAccount | null> {
    try {
      const accessToken: string | null = await this._loadAccessToken();
      if (!accessToken || accessToken === '') {
        return null;
      }
      this.restConnector.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const {
        data: { data },
      } = await this.restConnector.get('/user/me');
      !data && (await this.useAndSaveAccessToken(null));
      return data;
    } catch (e: any) {
      return null;
    }
  }

  async useAndSaveAccessToken(token: string | null): Promise<void> {
    this.restConnector.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('authentication.accessToken', token || '');
    token && Toastconfig.success(i18n.t(common.loginSuccess));
  }

  async _loadAccessToken() {
    const accessToken = localStorage.getItem('authentication.accessToken');
    return accessToken;
  }

  async uploadFile(dataFile: File, dataurlPresigned: PresignUrlType) {
    try {
      const config: AxiosRequestConfig<any> = {
        method: 'put',
        url: `${dataurlPresigned.urlPresigned}`,
        headers: {
          'Content-Type': dataFile.type,
        },
        data: dataFile,
      };
      await axios(config);
      return dataurlPresigned.urlImage;
    } catch (error: any) {
      console.log(error.response.status);
      Toastconfig.error(error.response.status);
    }
  }

  async getPresignUrl(dataFile: File): Promise<PresignUrlType | undefined> {
    try {
      const data = await this.restConnector
        .post('/upload-file', {
          fileName: dataFile.name,
          type: 'avatar',
        })
        .then((response) => response.data.data);
      console.log('getPresignUrl', { data });
      return data;
    } catch (error: any) {
      Toastconfig.error(error.response.data.errorList[0]);
      return;
    }
  }

  async updateUser(
    dataForm: UpdateUserType,
    nonToast?: boolean,
  ): Promise<ResultAccount | undefined> {
    try {
      const fomartDataForm = dataForm.userDOB
        ? {
            ...dataForm,
            userDOB: dataForm.userDOB ? moment(dataForm.userDOB).valueOf() : '',
          }
        : dataForm;
      const data = await this.restConnector
        .patch('/user/me', fomartDataForm)
        .then((response) => response.data.data);
      data && !nonToast && Toastconfig.success();
      return data;
    } catch (error: any) {
      Toastconfig.error(error.response.data.errorList[0]);
      return;
    }
  }

  async getAreaCode(): Promise<NationList[]> {
    try {
      const data = await this.restConnector
        .get('/user/area-code')
        .then((response) => response.data.data);
      return data;
    } catch (error: any) {
      console.log(error.response.data.errorList);
      Toastconfig.error(error.response.data.errorList[0]);
      throw error;
    }
  }

  async getListSearh(): Promise<HotSearchType[]> {
    try {
      const data = await this.restConnector
        .get('/web-app/hot-search')
        .then((response) => response.data.data);
      return data;
    } catch (error: any) {
      console.log(error.response.data.errorList);
      throw error;
    }
  }

  public async forgotPassword(email: string) {
    return await this.restConnector.post('/accounts/send-email-reset-password', {
      email,
    });
  }

  public async changePassword(data: ChangePassword) {
    return await this.restConnector.post('/accounts/change-password', data);
  }
  setFromData(data: any) {
    const bodyFormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key].name && (key === 'images' || key === 'image')) {
        bodyFormData.append('image', data[key]);
      } else {
        bodyFormData.set(key, data[key]);
      }
    });
    return bodyFormData;
  }

  async apply(form: ApplyType): Promise<ApplyType | undefined> {
    try {
      const {
        data: { data },
      } = await this.restConnector.post('/web-app/apply', { ...form, language: i18next.language });
      return data;
    } catch (error: any) {
      console.log(error.response.data);
      Toastconfig.error(error.response.data.error.message);
      return;
    }
  }

  async changeLanguage(
    language: 'korean' | 'english',
    account: ResultAccount | null,
  ): Promise<ResultAccount | null> {
    localStorage.setItem('lang', language);
    i18n.changeLanguage(language);
    (this.restConnector.defaults.headers as any)['Accept-Language'] =
      language === 'korean' ? 'kr' : 'en';
    if (account) {
      try {
        const {
          data: { data },
        } = await this.restConnector.patch('/user/change-language', {
          language: language,
        });
        return data;
      } catch (error: any) {
        console.log(error.response.data);
        Toastconfig.error(error.response.data.errorList[0]);
        return null;
      }
    }
    return null;
  }
}
