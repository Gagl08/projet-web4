import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';
import {LoginData} from '@/models/form/LoginData';
import {isSamePassword} from '@/lib/PasswordTools';

const prisma = new PrismaClient();

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "adress@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const {email, password} = credentials as LoginData;
        if (!email || !password) return null;

        // Appel à la base de donnée
        const user = await prisma.user.findUnique({
          where: {email}
        });

        // Vérification de la connexion
        if (user && await isSamePassword(password, user.password)) {
          return user;
        }

        return null;
      },
    })
  ];

  return await NextAuth(req, res, {
    providers,
    session: {strategy: "jwt",},
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        const user = await prisma.user.findFirst({
          where: { email: session.user.email }
        });

        session.token = token.sub
        session.user = user
        return session
      },
    },
  })
}