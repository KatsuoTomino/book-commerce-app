import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
export const POST = async (request: Request) => {
  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = session.client_reference_id;
    if (!userId) {
      throw new Error("client_reference_id is undefined or null");
    }

    const bookId = session.metadata?.bookId ?? "defaultBookId";
    if (!bookId) {
      throw new Error("bookId is undefined or null");
    }

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: userId,
          bookId: bookId,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ message: "すでに購入済みです" });
    }
  } catch {
    return NextResponse.json({ error: "An unexpected error occurred." });
  }
};
