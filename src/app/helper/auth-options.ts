import { encrypt } from '@/app/helper/encrypt-decrypt';
import jwt from 'jsonwebtoken';
import { AuthOptions } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend built-in types
declare module 'next-auth' {
  interface User {
    full_name: string;
    username: string;
    access_token: string;
    phone?: string;
    avatar_url?: string;
    is_admin?: boolean;
  }

  interface Session {
    accessToken?: string;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}

export const authOptions: AuthOptions = {

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing username or password');
        }

        const res = await fetch(process.env.API_URL + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          throw new Error('Login failed');
        }

        const user = await res.json();
        return { ...user, id: user.id.toString() };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account}) {
      // Initial sign-in
      if (user && account) {
        const decoded = jwt.decode(user.access_token) as jwt.JwtPayload;
        return {
          ...token,
          accessToken: encrypt(user.access_token),
          accessTokenExpires: (decoded.exp || 0) * 1000,
        };
      }

      // Return previous token if not expired
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Token is expired, set error
      return { ...token, error: 'TokenExpired' };
    },
    async session({ session, token }) {
      console.log('🩸🩸 ~ token:', token);
      // Pass accessToken to session
      session.accessToken = encrypt(token.accessToken || '');
      console.log('🩸🩸 ~ session:', session);
      // Pass error to session if token expired
      if (token.error) session.error = token.error;

    //   update cookies

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
