import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    // Simulation Mode if no key is present
    if (!BREVO_API_KEY) {
        console.log("Simulating Brevo API call for:", email);
        console.log("Please add BREVO_API_KEY to .env.local to enable real sending.");
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return NextResponse.json({ success: true, message: 'Simulated success (No API Key found)' });
    }

    try {
        // 1. Create Contact in Brevo
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': BREVO_API_KEY
            },
            body: JSON.stringify({
                email: email,
                listIds: [50], // List ID 50 updated per user request
                updateEnabled: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Brevo API Error:', errorData);
            // If contact already exists, we consider it a success for the UX
            if (errorData.code === 'duplicate_parameter') {
                return NextResponse.json({ success: true, message: 'Contact already exists' });
            }
            return NextResponse.json({ error: 'Failed to add contact' }, { status: 500 });
        }

        // 2. (Optional) Send Transactional Email with the Download Link
        // We would call https://api.brevo.com/v3/smtp/email here
        // For now, adding to the list is the primary "Lead Magnet" action.

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
