import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { UserController } from "@/controllers/UserController";

export const config: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ account }) {
            if (!account) return "/login";

            try {
                const token = await UserController.auth(account.id_token!);
                (account as any).access_token = token;
                return true;
            } catch {
                return "/login";
            }
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
};

export default NextAuth(config);
