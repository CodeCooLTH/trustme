import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    CredentialsProvider({
      id: "phone-otp",
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null;
        const user = await prisma.user.findFirst({
          where: { phone: credentials.phone },
        });
        if (!user) return null;
        return { id: user.id, name: user.displayName, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
      }
      if (account?.provider === "facebook") {
        let dbUser = await prisma.user.findFirst({
          where: {
            authAccounts: {
              some: {
                provider: "FACEBOOK",
                providerAccountId: account.providerAccountId,
              },
            },
          },
        });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              displayName: user?.name || "User",
              username: `user_${Date.now()}`,
              avatar: user?.image,
              authAccounts: {
                create: {
                  provider: "FACEBOOK",
                  providerAccountId: account.providerAccountId,
                  accessToken: account.access_token,
                },
              },
            },
          });
        }
        token.userId = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        const user = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: {
            id: true,
            displayName: true,
            username: true,
            avatar: true,
            isShop: true,
            isAdmin: true,
            trustScore: true,
          },
        });
        if (user) {
          (session as any).user = user;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// Helper for admin-only routes
export async function requireAdmin() {
  const { getServerSession } = await import("next-auth");
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user as any).isAdmin) {
    return null;
  }
  return session.user as any;
}
