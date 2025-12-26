
const fs = require('fs');
const path = require('path');

async function scheduleCampaigns() {
    const API_URL = 'http://localhost:3000/api/campaigns';
    const newslettersPath = path.join(process.cwd(), 'data', 'newsletters.json');

    // Read newsletters
    const newsletters = JSON.parse(fs.readFileSync(newslettersPath, 'utf8'));

    console.log(`Found ${newsletters.length} newsletters to schedule.`);

    // Start scheduling from tomorrow
    let scheduleDate = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + 1); // Start tomorrow
    scheduleDate.setHours(9, 0, 0, 0); // 9:00 AM

    const SENDER = {
        name: "Storytime with Ms. Erica",
        email: "info@storytimewithmserica.com"
    };

    for (let i = 0; i < newsletters.length; i++) {
        const item = newsletters[i];

        // Schedule 7 days apart
        // We actually need to calculate the date based on the index to ensure they are sequential
        // Current scheduleDate is "Tomorrow". 
        // For i=0, use Tomorrow.
        // For i=1, Use Tomorrow + 7 days

        const campaignDate = new Date(scheduleDate);
        campaignDate.setDate(scheduleDate.getDate() + (i * 7));

        const payload = {
            name: `${item.title} - Newsletter #${i + 1}`,
            subject: item.subject,
            sender: SENDER,
            tags: ["Storytime Series", "Weekly Newsletter"],
            htmlContent: item.body,
            recipients: [50], // List ID 50
            scheduledAt: campaignDate.toISOString()
        };

        try {
            console.log(`Scheduling "${item.title}" for ${campaignDate.toISOString()}...`);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`✅ Success! Campaign ID: ${data.id}`);
            } else {
                console.error(`❌ Failed:`, data);
                // Wait a bit if we hit rate limits (Brevo might have rate limits)
                await new Promise(r => setTimeout(r, 1000));
            }

            // Small delay between requests to be nice to the API
            await new Promise(r => setTimeout(r, 500));

        } catch (error) {
            console.error(`❌ Error scheduling campaign ${i + 1}:`, error);
        }
    }

    console.log("Done scheduling campaigns.");
}

scheduleCampaigns();
