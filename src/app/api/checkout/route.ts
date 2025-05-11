import { NextResponse } from "next/server";
import Stripe from "stripe";

// 環境変数を安全にチェックする
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEYが設定されていません。");
}

// Stripeインスタンスを初期化
const stripe = new Stripe(secretKey);

export async function POST(request: Request) {
  const { title, price, bookId, userId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        bookId: bookId,
      },
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
            },
            unit_amount: Math.round(price), // 単価を整数に変換
          },
          quantity: 1, // 数量指定
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000`,
    });
    return NextResponse.json({ checkout_url: session.url });
  } catch (err) {
    console.error("Checkout セッション作成中にエラー:", err);
    // エラー処理を強化
    return NextResponse.json({
      error:
        err instanceof Error ? err.message : "不明なエラーが発生しました。",
    });
  }
}
