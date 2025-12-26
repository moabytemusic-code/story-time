import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, subject, sender, htmlContent, recipients, scheduledAt } = body;

        if (!name || !subject || !htmlContent) {
            return NextResponse.json(
                { error: 'Missing required fields: name, subject, or htmlContent' },
                { status: 400 }
            );
        }

        const BREVO_API_KEY = process.env.BREVO_API_KEY;
        const BREVO_USER = process.env.BREVO_USER;

        const campaignSender = sender || { name: 'Storytime with Ms. Erica', email: 'info@storytimewithmserica.com' };

        if (!campaignSender.email) {
            return NextResponse.json(
                { error: 'Sender email is required and BREVO_USER env var is missing' },
                { status: 500 }
            );
        }

        if (!BREVO_API_KEY) {
            console.log("Simulating Brevo Campaign Creation:", { name, subject });
            return NextResponse.json({
                success: true,
                message: 'Simulated campaign creation (No API Key found)',
                id: 'simulated_campaign_id_123'
            });
        }

        // 1. Create the Campaign Draft
        const campaignData = {
            name,
            subject,
            sender: {
                name: campaignSender.name,
                email: campaignSender.email
            },
            type: 'classic',
            htmlContent,
            recipients: {
                listIds: recipients && recipients.length > 0 ? recipients : [2] // Default to provided list or fallback
            },
            // method: 'POST' is implied for the fetch call below, but this is the body payload
        };

        if (scheduledAt) {
            campaignData.scheduledAt = scheduledAt;
        }

        console.log("Creating Campaign with data:", JSON.stringify({ ...campaignData, htmlContent: '...' }, null, 2));

        const response = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': BREVO_API_KEY
            },
            body: JSON.stringify(campaignData)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Brevo Campaign Error:', data);
            return NextResponse.json(
                { error: 'Failed to create campaign', details: data },
                { status: response.status }
            );
        }

        // 2. (Optional) If we want to schedule it immediately if scheduledAt was passed in the body
        // The 'scheduledAt' field in the Create Campaign payload creates it as a Scheduled campaign if in the future,
        // or Draft if not specified. 

        return NextResponse.json({
            success: true,
            id: data.id,
            message: 'Campaign created successfully'
        });

    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
