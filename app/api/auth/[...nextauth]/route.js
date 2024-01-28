import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../../../libs/mongodb";
import bcrypt from "bcryptjs";
import User from '../../../../models/user'



const authOption = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;
                    console.log("hello123");
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
                    console.log("hello124");
                    if (!user) {

                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if(!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {

                        console.log("Error: ", error)
                }
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    }
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };