import { combineReducers } from 'redux';
import AccountsSlice, { accountSelectors } from './AccountsSlice';

const rootReducer = combineReducers({
  accounts: AccountsSlice,
});

export default rootReducer;

export const selectors = {
  account: accountSelectors,
};

export type RootState = ReturnType<typeof rootReducer>;
