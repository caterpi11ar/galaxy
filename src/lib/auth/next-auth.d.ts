import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      provider?: string
      providerId?: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    provider?: string
    providerId?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    provider?: string
    providerId?: string
  }
}
