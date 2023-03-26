import type {User} from "@prisma/client";

export type Session = {
  user: User
  token: string
}