type Post = {
  author: string
  message: string
  id: string
  user_id?: string
  verified?: boolean
}

type User = {
  email: string
  name: string
  username: string
  password: string
  passwordConfirm?: string
  verified: boolean
  id: string
}

type UpdateUser = {
  // email: string
  username: string
  name: string
  id: string
}

type ResponseError = string

type SignInCredentials = {
  identity: string
  password: string
}

type SignUpCredentials = {
  email: string
  username: string
  password: string
  passwordConfirm: string
  name: string
  emailVisibility: boolean
}
