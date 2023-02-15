import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { i18n } from 'next-i18next';
import Toastconfig from '@/assets/toast';
import {
  LoginCredentials,
  ResultAccount,
  SignUpType,
  UpdateUserType,
  VerificationType,
} from '../../Models';
import store, { AppThunk } from '../store';
import { RootState } from './index';
import { getWindowDimensions } from '@/components/GetWidthHeightWindow/useWindowDimensions';
import { accountService } from '@/app/Services';

//-----------------New redux UserProfileSlide region create for forgot password------------------

const Accounts = createSlice({
  name: 'accounts',
  initialState: null as ResultAccount | null,
  reducers: {
    setAccount(state, action) {
      return action.payload;
    },
  },
});

const { setAccount } = Accounts.actions;

export const login = (loginForm: LoginCredentials) => async (dispatch: Dispatch) => {
  const user = await accountService.login(loginForm);
  dispatch(setAccount(user));
  return user;
};

export const loginGoogle = (token: string) => async (dispatch: Dispatch) => {
  const user = await accountService.loginGoogle(token);
  if (!user) {
    Toastconfig.error(i18n.t(errorMessage.er_login));
  }
  dispatch(setAccount(user));
  return user;
};

export const loadLoginUser = (callback?: () => any) => async (dispatch: Dispatch) => {
  try {
    const user = await accountService.getLoginUser();
    console.log({ user });
    if (user) {
      dispatch(setAccount(user));
      callback && callback();
      return user;
    }
  } catch (error) {
    return;
  }
};

export const updateUser =
  (dataForm: UpdateUserType, nonToast?: boolean) => async (dispatch: Dispatch) => {
    const user = await accountService.updateUser(dataForm, nonToast);
    if (user) {
      dispatch(setAccount(user));
      return user;
    }
    return;
  };

export const responseKakao = () => async () => {
  const windowLoginKakao = window.open(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${window.location.origin}/oauth/kakao/callback&response_type=code`,
  );
  const vInterval = setInterval(async () => {
    if (windowLoginKakao && windowLoginKakao.closed) {
      clearInterval(vInterval);
      const token = await accountService.getAccessToken();
      if (token) {
        Toastconfig.success(i18n.t(common.loginSuccess));
        store.dispatch(loadLoginUser(History.push('/home', { replace: true })));
      }
    }
  }, 1000);
};

export const signUp = (data: SignUpType) => async (dispatch: Dispatch) => {
  try {
    const user = await accountService.signUp(data);
    if (user) {
      dispatch(setAccount(user));
      return user;
    }
  } catch (error) {
    return;
  }
};

export const emailVerification = (data: VerificationType) => async (dispatch: Dispatch) => {
  const user = await accountService.checkOtpVerify(data);
  user && dispatch(setAccount(user));
  return user;
};

const nagivateWhentLogout = () => {
  const { width } = getWindowDimensions();
  if (width > 768) return navigateTo('/login');
  return navigateTo('/login-method');
};

export const logOutAndDeleteToken =
  (callback?: () => any): AppThunk =>
  async (dispatch: Dispatch) => {
    await accountService.logout();
    dispatch(setAccount(null));
    callback && callback();
    nagivateWhentLogout();
  };

export const logOut =
  (callback: () => any): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const { accounts } = getState();
    if (!accounts) return;
    switch (accounts.typeToken) {
      case 'google': {
        const auth2 = (window as any).gapi?.auth2.getAuthInstance();
        auth2 && auth2.signOut().then(auth2.disconnect());
        return store.dispatch(logOutAndDeleteToken(callback));
      }
      case 'kakao': {
        const windowLoginKakao = window.open(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&logout_redirect_uri=${window.location.origin}/kakao-expire`,
        );
        const vInterval = setInterval(async () => {
          if (windowLoginKakao && windowLoginKakao.closed) {
            clearInterval(vInterval);
            const token = await accountService.getAccessToken();
            if (!token) {
              dispatch(setAccount(null));
              callback && callback();
              nagivateWhentLogout();
            }
            return;
          }
        }, 500);
        return;
      }
      default:
        return store.dispatch(logOutAndDeleteToken(callback));
    }
  };

export const changeLanguageRedux =
  (language: 'korean' | 'english'): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const { accounts } = getState();
    return await accountService.changeLanguage(language, accounts);
  };

export const accountSelectors = {
  select: (state: RootState): ResultAccount | null => state.accounts,
};

export default Accounts.reducer;
