import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { env } from '../env'

export const authConfig: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/', // 使用自定义登录页面
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // 初次登录时保存账户信息
      if (account) {
        token.provider = account.provider
        token.providerId = account.providerAccountId
      }

      // 保存用户信息
      if (user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      // 将 token 中的信息传递到 session
      if (session.user) {
        session.user.id = token.id as string
        session.user.provider = token.provider as string
        session.user.providerId = token.providerId as string
      }

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
}
