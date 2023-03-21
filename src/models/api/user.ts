type CreateUserQuery = {
  email: string
  password: string
  firstName: string
  lastName: string
}

type ReadUserQuery = {
  id?: string
}

type DeleteUserQuery = {
  id: string
}

export type {CreateUserQuery, ReadUserQuery, DeleteUserQuery};
