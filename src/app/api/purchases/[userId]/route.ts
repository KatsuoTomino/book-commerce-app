import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { userId: string } }) {
  const userId = await params?.userId; // paramsをawaitで取得

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId }, // ユーザーIDでデータを検索
    });
    return new NextResponse(JSON.stringify(purchases));
  } catch (error) {
    console.error("購入データ取得エラー:", error);
    return new NextResponse("購入データの取得に失敗しました");
  }
}
