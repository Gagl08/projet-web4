import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {NextApiRequest, NextApiResponse} from 'next';
import {LoginData} from '@/models/form/LoginData';
import {isSamePassword} from '@/lib/PasswordTools';
import {User} from '@prisma/client';
import prismaClient from '@/lib/prismaClient';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'adresse@email.com'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'mot de passe',
        },
      },
      async authorize(credentials: unknown) {
        const {email, password} = credentials as LoginData;
        if (!email || !password) return null;

        // Appel à la base de donnée
        const user = await getUserByEmail(email);
        if (!user) return null;

        // Vérification de la connexion
        const passwordIsValid = await isSamePassword(password, user.password);
        if (passwordIsValid) return user;
        else return null;
      },
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    session: {strategy: 'jwt'},
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({session, token}: { session: any; token: any }) {
        session.token = token.sub;
        session.user = await getUserByEmail(session.user.email);

        return session;
      },
    },
  });
}

async function getUserByEmail(email: string): Promise<null | User> {
  return prismaClient.user.findUnique({
    where: {email}
  });
}