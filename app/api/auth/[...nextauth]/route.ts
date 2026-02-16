import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile?.email) {
        token.email = profile.email;
        token.role = adminEmails.includes(profile.email)
          ? "admin"
          : "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
