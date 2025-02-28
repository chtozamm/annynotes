export type Note = {
  author: string;
  message: string;
  id: string;
  user_id: string;
  verified: boolean;
};

export type User = {
  email: string;
  name: string;
  username: string;
  password: string;
  // passwordConfirm?: string;
  verified: boolean;
  id: string;
};

export type UpdateUser = {
  // email: string
  username: string;
  name: string;
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
