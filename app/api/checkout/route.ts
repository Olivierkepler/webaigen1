import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.webaigen.com";

    if (!secretKey) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY in .env.local" },
        { status: 500 }
      );
    }

    console.log("Stripe key mode:", secretKey.startsWith("sk_live_") ? "LIVE" : "TEST");

    const { amount } = await req.json();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 1) {
      return NextResponse.json(
        { error: "Please enter a valid payment amount." },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(numericAmount * 100);

    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountInCents,
            product_data: {
              name: "WebAigen Custom Project Payment",
              description:
                "Secure payment for WebAigen AI automation, software development, and business technology services.",
            },
          },
        },
      ],

      billing_address_collection: "auto",

      customer_creation: "always",

      success_url: `${appUrl}/success`,
      cancel_url: `${appUrl}/cancel`,
    });

    console.log("Stripe checkout session:", session.id);

    return NextResponse.json({
      url: session.url,
      mode: session.id.startsWith("cs_live_") ? "LIVE" : "TEST",
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      {
        error: error.message || "Checkout failed",
        type: error.type || null,
        statusCode: error.statusCode || null,
      },
      { status: 500 }
    );
  }
}