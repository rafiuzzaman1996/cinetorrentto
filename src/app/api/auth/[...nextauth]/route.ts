import { authOptions } from '@/app/helper/auth-options';
import NextAuth from 'next-auth';


// Validate environment variables
if (!process.env.API_URL) {
throw new Error('API_URL is not defined');
}
if (!process.env.NEXTAUTH_SECRET) {
throw new Error('NEXTAUTH_SECRET is not defined');
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };