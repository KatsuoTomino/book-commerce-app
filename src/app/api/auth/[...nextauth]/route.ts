import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth";

// サーバ側でログイン処理を実行するためのエンドポイント
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
