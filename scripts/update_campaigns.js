
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/BREVO_API_KEY=(.*)/);
const BREVO_API_KEY = match ? match[1].trim() : process.env.BREVO_API_KEY;

async function updateCampaigns() {
    console.log("Starting bulk update...");

    const newslettersPath = path.join(process.cwd(), 'data', 'newsletters.json');
    const newsletters = JSON.parse(fs.readFileSync(newslettersPath, 'utf8'));

    // IDs start at 205
    const START_ID = 205;

    // Start scheduling from tomorrow (to keep date logic consistent if we need to update date too)
    let scheduleDate = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + 1);
    scheduleDate.setHours(9, 0, 0, 0);

    const SENDER = {
        name: "Storytime with Ms. Erica",
        email: "ken@mail.thefreebiechannel.com"
    };

    for (let i = 0; i < newsletters.length; i++) {
        const item = newsletters[i];
        const campaignId = START_ID + i;

        const campaignDate = new Date(scheduleDate);
        campaignDate.setDate(scheduleDate.getDate() + (i * 7));

        const payload = {
            name: `${item.title} - Newsletter #${i + 1}`,
            subject: item.subject,
            sender: SENDER,
            htmlContent: item.body,
            tags: ["Storytime Series", "Weekly Newsletter"]
            // scheduledAt: campaignDate.toISOString() // Typically can't update schedule on a scheduled campaign easily, but let's try just updating content first.
        };
        // Brevo might note allow updating 'scheduledAt' if status is 'queued'.
        // We will focus on Content and Sender.

        try {
            console.log(`Updating Campaign ${campaignId} ("${item.title}")...`);

            const response = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaignId}`, {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'api-key': BREVO_API_KEY
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`✅ Success: ${campaignId}`);
            } else {
                console.log(`❌ Failed: ${campaignId} - ${response.status} ${response.statusText}`);
                if (response.status === 429) {
                    console.log("Rate limited. Waiting 10 seconds...");
                    await new Promise(r => setTimeout(r, 10000));
                    i--; // Retry this one
                    continue;
                }
            }

            // Wait 2 seconds between calls to be safe
            await new Promise(r => setTimeout(r, 2000));

        } catch (error) {
            console.error(`❌ Error updating ${campaignId}:`, error.message);
        }
    }

    console.log("Done updating campaigns.");
}

updateCampaigns();
