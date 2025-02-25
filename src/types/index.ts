export interface NewUser {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export type LoginUser = Pick<NewUser, 'email' | 'password'>;

export type Token = {
  accessToken: string;
  refreshToken: string;
};
