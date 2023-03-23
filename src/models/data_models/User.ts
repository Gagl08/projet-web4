export type User = {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: "USER" | "ADMIN"
}