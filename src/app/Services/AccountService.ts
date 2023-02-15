import { UpdateUserType, VerificationType } from 'app/Models';
import { ApplyType } from 'app/Models/Apply';
import { AxiosResponse } from 'axios';
import { LoginCredentials, SignUpType, ChangePassword, ResultAccount } from '../Models/Account';
import { AccountGateway } from './Gateways/AccountGateway';
export class AccountService {
  private accountGateway: AccountGateway;

  constructor(accountGateway: AccountGateway) {
    this.accountGateway = accountGateway;
  }

  async login(loginForm: LoginCredentials) {
    const { token } = await this.accountGateway.login(loginForm);
    await this.accountGateway.useAndSaveAccessToken(token);
    return this.accountGateway.getLoginUser();
  }

  async loginGoogle(accountToken: string) {
    const token = await this.accountGateway.loginGoogle(accountToken);
    await this.accountGateway.useAndSaveAccessToken(token);
    return this.accountGateway.getLoginUser();
  }

  async loginKakao() {
    const tokenKakao = await this.accountGateway.getTokenKakao();
    if (tokenKakao) {
      const token = await this.accountGateway.loginKakao(tokenKakao);
      await this.accountGateway.useAndSaveAccessToken(token).then(() => window.close());
    }
  }

  getAccessToken() {
    return this.accountGateway._loadAccessToken();
  }

  getLoginUser() {
    return this.accountGateway.getLoginUser();
  }

  async logout() {
    this.accountGateway.logout();
    await this.accountGateway.useAndSaveAccessToken('');
    return;
  }

  async signUp(signUpForm: SignUpType) {
    const data = await this.accountGateway.signUp(signUpForm);
    if (data) {
      await this.accountGateway.useAndSaveAccessToken(data.token);
      await this.accountGateway.resendOTP(data.userEmail);
    }
    return data;
  }

  async updateUser(dataForm: UpdateUserType, nonToast?: boolean) {
    if (dataForm.avatar instanceof File) {
      const dataPresign = await this.accountGateway.getPresignUrl(dataForm.avatar);
      if (dataPresign) {
        const urlImage = await this.accountGateway.uploadFile(dataForm.avatar, dataPresign);
        if (urlImage) {
          return this.accountGateway.updateUser({ ...dataForm, avatar: urlImage }, nonToast);
        }
      }
    } else return this.accountGateway.updateUser(dataForm, nonToast);
  }

  checkUserEmail(userEmail: string) {
    return this.accountGateway.checkUserEmail(userEmail);
  }

  checkOtpVerify(data: VerificationType) {
    return this.accountGateway.checkOtpVerify(data);
  }

  resendOTP(userEmail: string) {
    return this.accountGateway.resendOTP(userEmail);
  }

  getAreaCode() {
    return this.accountGateway.getAreaCode();
  }

  async getListSearch() {
    return this.accountGateway.getListSearh();
  }

  // getLoginUser(): Promise<LoginUser | null> {
  //   return this.accountGateway.getLoginUser();
  // }

  // editAccount(userForm: LoginUser): Promise<void | null> {
  //   return this.accountGateway.edit(userForm);
  // }

  // uploadFile(file: Object): Promise<Object | null> {
  //   return this.accountGateway.upload(file);
  // }

  forgotPassword(email: string): Promise<AxiosResponse<any, any> | null> {
    return this.accountGateway.forgotPassword(email);
  }

  changePassword(data: ChangePassword): Promise<AxiosResponse<any, any> | null> {
    return this.accountGateway.changePassword(data);
  }

  apply(form: ApplyType) {
    return this.accountGateway.apply(form);
  }

  changeLanguage(language: 'korean' | 'english', account: ResultAccount | null) {
    return this.accountGateway.changeLanguage(language, account);
  }
}
