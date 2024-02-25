type Post = {
  author: string
  message: string
  id: string
  user_id?: string
}

type User = {
  email: string
  username: string
  password: string
  passwordConfirm?: string
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
}
