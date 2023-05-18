import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {NextApiRequest, NextApiResponse} from 'next';

import {LoginData} from '@/models/form/LoginData';
import {isSamePassword} from '@/lib/PasswordTools';

import type {User} from '@prisma/client';
import prismaClient from '@/lib/prismaClient';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials: unknown) {
        const {email, password} = credentials as LoginData;
        if (!email || !password) return null;

        // Appel à la base de donnée
        const user: User | null = await getUserByEmail(email);
        if (!user) return null;

        // Vérification de la connexion
        const passwordIsValid: boolean = await isSamePassword(password, user.password);
        if (passwordIsValid) return user;
        else return null;
      },
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    session: {strategy: 'jwt'},
    pages: {
      signIn: '/login',
      signOut: '/auth/signout',
      error: '/auth/error',
      verifyRequest: '/auth/verify-request',
      newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
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
  return prismaClient.user.findUnique({where: {email}});
}