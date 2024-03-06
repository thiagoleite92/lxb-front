export interface AuthResponseType {
  token: string;
  user: {
    name: string;
    email: string;
    id: number;
  };
}
