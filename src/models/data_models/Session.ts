import {User} from '@/models/data_models/User';

export type Session = {
  user: User
  token: string
}