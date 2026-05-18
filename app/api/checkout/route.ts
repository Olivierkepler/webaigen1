import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  maxNetworkRetries: 0,
  timeout: 20000,
});

export async function POST() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY in Vercel." },
        { status: 500 }
      );
    }

    const appUrl =
      // process.env.NEXT_PUBLIC_APP_URL || "https://test-roan-one-35.vercel.app";
      process.env.NEXT_PUBLIC_APP_URL || "https://www.webaigen.com/";

     

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI Automation Consultation",
              description:
                "Webaigen consultation for AI automation, workflow planning, and software strategy.",
            },
            unit_amount: 2500,
          },
          quantity: 1,
        },
      ],

      success_url: `${appUrl}/success`,
      cancel_url: `${appUrl}/cancel`,

      billing_address_collection: "required",
      customer_creation: "always",

      phone_number_collection: {
        enabled: true,
      },

      custom_text: {
        submit: {
          message:
            "Your payment is securely processed. A confirmation will be provided after completion.",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("STRIPE_CHECKOUT_ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Stripe checkout failed. Please check Vercel runtime logs.",
      },
      { status: 500 }
    );
  }
}