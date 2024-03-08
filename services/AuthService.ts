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
    if (typeof window !== undefined) {
      localStorage?.setItem('token', data.token);
      localStorage?.setItem('user', JSON.stringify(data.user));
    }
  }

  retrieveTokenAndUser(): AuthResponseType | null {
    if (typeof window !== undefined) {
      const token = localStorage?.getItem('token');
      const user = localStorage?.getItem('user');

      if (token && user) {
        return { token, user: JSON.parse(user) };
      } else {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage?.getItem('token');
    }
    return false;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage?.clear();
    }
  }
}
