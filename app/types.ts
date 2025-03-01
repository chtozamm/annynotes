export type Note = {
  author: string;
  message: string;
  id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type Credentials = {
  token: string;
  user_id: string;
};

export type User = {
  id: string;
};

export type ResponseError = string;

export type SignInCredentials = {
  identity: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  username?: string;
  password: string;
  passwordConfirm: string;
  name?: string;
  emailVisibility: boolean;
};
