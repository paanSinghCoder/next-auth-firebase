import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cert } from "firebase-admin/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { doc, getDoc } from "firebase/firestore";

import { GOOGLE_AUTHORIZATION_URL, refreshAccessToken } from ".";
import { auth, db } from "./firebase";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error));
      },
    }),
  ],
  // @ts-ignore
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }),
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      } else if (token.email) {
        const userRef = doc(db, "users", token.id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // This is only required for credentials login
          const dbUser = userSnap.data();
          console.log("DB user", dbUser);
          token.name = dbUser.name; // Adding name to the user session
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, update it
      return refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.accessTokenExpires = token.accessTokenExpires;
      session.refreshToken = token.refreshToken;

      console.log("Session in route: ", session);

      return session;
    },
  },
  pages: { signIn: "/login", signOut: "/login" },
  session: {
    strategy: "jwt",
    /*
     * Set maxAge to 30 minutes.
     * The user will be logged out after 30 minutes of inactivity.
     * Timer resets on user activity.
     */
    maxAge: 1800, // 30 minutes in seconds
    // maxAge: 60,
  },
  jwt: {
    /*
     * Set maxAge to 60 minutes.
     * The user will be logged out after 60 minutes irrespective of idle or not.
     */
    maxAge: 3600, // 1 hour in seconds
  },
};
