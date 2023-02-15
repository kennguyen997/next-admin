import axios from 'axios';

import { AccountGateway } from './Gateways/AccountGateway';
import { EventGateway } from './Gateways/EventGateway';

import { AccountService } from './AccountService';
import { EventService } from './EventService';
import i18n from 'app/trans/i18n';
import Toastconfig from 'assets/toast';
import { errorMessage } from 'app/trans';
import store from 'app/redux/store';
import { logOutAndDeleteToken } from 'app/redux/Slices/AccountsSlice';

const restConnector = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 4000,
  headers: {
    'Accept-Language': i18n.language === 'korean' ? 'kr' : 'en',
  },
});

restConnector.interceptors.response.use(
  async function (response) {
    return response;
  },
  async (error) => {
    if (typeof window !== 'undefined') {
      if (error.response.status === 401 && !error.request.responseURL.includes('/user/logout')) {
        Toastconfig.error(i18n.t(errorMessage.unauthentication));
        await store.dispatch(logOutAndDeleteToken());
      }
    }
    return Promise.reject(error);
  },
);

const accountGateway = new AccountGateway(restConnector);
const eventGateway = new EventGateway(restConnector);

export const accountService = new AccountService(accountGateway);
export const eventService = new EventService(eventGateway);
