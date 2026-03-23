import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import FacebookProvider from 'next-auth/providers/facebook'
import { getServerSession } from 'next-auth'
import { prisma } from './prisma'
import { UserRole } from '@prisma/client'
import { UnauthorizedError, ForbiddenError } from './errors'

const customAdapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data: { name?: string; email?: string; image?: string; emailVerified?: Date | null }) => {
    return prisma.user.create({
      data: {
        facebookId: `temp-${Date.now()}`,
        name: data.name ?? '',
        email: data.email,
        avatar: data.image,
        role: UserRole.BUYER,
      },
    })
  },
}

export const authOptions: NextAuthOptions = {
  adapter: customAdapter as any,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        const dbUser = await prisma.user.update({
          where: { id: user.id },
          data: { facebookId: account.providerAccountId },
        })
        token.userId = dbUser.id
        token.role = dbUser.role
        token.facebookId = dbUser.facebookId
      } else if (token.userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: { role: true },
        })
        if (dbUser) token.role = dbUser.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
  pages: { signIn: '/login', error: '/login' },
}

export async function getSession() {
  return getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session?.user) throw new UnauthorizedError()
  return session.user
}

export async function requireRole(...roles: UserRole[]) {
  const user = await requireAuth()
  if (!roles.includes(user.role)) throw new ForbiddenError()
  return user
}
