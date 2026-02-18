import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];

async function refreshGoogleAccessToken(token: any) {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshed = await res.json();

    if (!res.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      // Google may not always return refresh_token again
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.error("Error refreshing access token", err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // Required for Calendar
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
          // So we can refresh tokens
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile }) {
      // Initial sign-in
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // only returned on first consent
        token.accessTokenExpires = Date.now() + ((typeof account.expires_in === "number" ? account.expires_in : 3600) * 1000);
        token.email = profile.email;

        token.role = profile.email && adminEmails.includes(profile.email)
          ? "admin"
          : "user";
      }

      // If token still valid, return it
      if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Refresh if expired and we have refresh token
      if (token.refreshToken) return await refreshGoogleAccessToken(token);

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        (session.user as any).role = token.role;
        (session as any).accessToken = token.accessToken;
        (session as any).error = token.error;
      }
      return session;
    },
  },

  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
