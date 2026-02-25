import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

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
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile }) {
      // first sign-in (either provider)
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;

        const email = (profile as any)?.email;
        if (email) token.email = email;

        token.role =
          token.email && adminEmails.includes(token.email as string)
            ? "admin"
            : "user";

        // Google-only fields for refresh
        if (account.provider === "google") {
          token.refreshToken = account.refresh_token; // only first consent
          const expiresIn =
            typeof account.expires_in === "number" ? account.expires_in : 3600;
          token.accessTokenExpires = Date.now() + expiresIn * 1000;
        } else {
          // GitHub usually doesn't give refresh tokens
          token.refreshToken = undefined;
          token.accessTokenExpires = undefined;
        }
      }

      // refresh only for Google
      if (token.provider === "google" && token.accessTokenExpires) {
        if (Date.now() < (token.accessTokenExpires as number)) return token;
        if (token.refreshToken) return await refreshGoogleAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        (session.user as any).role = token.role;
        (session as any).provider = token.provider;
        (session as any).accessToken = token.accessToken;
        (session as any).error = token.error;
      }
      return session;
    },
  },

  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };