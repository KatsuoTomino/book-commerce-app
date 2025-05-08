import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    // リクエストURLから userId を取得
    const url = new URL(request.url);
    const userId = url.pathname.split("/").pop();

    if (!userId) {
      return NextResponse.json(
        { error: "ユーザーIDが見つかりません。" },
        { status: 400 }
      );
    }

    // ユーザーの購入データを取得
    const purchases = await prisma.purchase.findMany({
      where: { userId },
    });

    return NextResponse.json(purchases, { status: 200 });
  } catch (error) {
    console.error("購入データ取得エラー:", error);
    return NextResponse.json(
      { error: "購入データの取得に失敗しました。" },
      { status: 500 }
    );
  }
};
