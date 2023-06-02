import NextAuth, { getServerSession } from "next-auth"

import EmailProvider from "next-auth/providers/email" // https://next-auth.js.org/configuration/providers/email
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

const adminEmails = ['vodoleq@gmail.com']

export const authOptions = {
  providers: [
    EmailProvider({
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD,
            },
          },
        from: 'NextAuth <noreply@example.com>',
        maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],

  // adapters for DB's
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user}) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session
      } else {
        return false
      }
      
    },
  }
}
export default NextAuth(authOptions)


// import in each api endpoint
export async function isAdminRequest(req,res) { 
  const session = await getServerSession(req,res,authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}