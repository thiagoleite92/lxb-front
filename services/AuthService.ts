import { LoginBody, RegisterBody } from '@/schemas';
import HttpService from './HttpService';
import { AuthResponseType } from '@/types/AuthResponseType';
import { RegisterResponseType } from '@/types/RegisterResponseType';

export default class AuthenticateService extends HttpService {
  async register(body: RegisterBody): Promise<RegisterResponseType> {
    return await this.post('/user', body);
  }

  async login(body: LoginBody): Promise<AuthResponseType> {
    return await this.post('/auth/session', body);
  }

  setTokenAndUser(data: AuthResponseType) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  retrieveTokenAndUser(): AuthResponseType | null {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
