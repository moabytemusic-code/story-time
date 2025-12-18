import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return new NextResponse('No items in checkout', { status: 400 });
        }

        // Map cart items to Stripe line items
        const line_items = items.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: item.image_url ? [item.image_url] : [],
                        description: item.description || undefined,
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects cents
                },
                quantity: item.quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/cancel`,
            metadata: {
                // You can pass order ID or user ID here
                source: 'story-time-app'
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error('[STRIPE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
