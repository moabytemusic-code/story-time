
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/BREVO_API_KEY=(.*)/);
const BREVO_API_KEY = match ? match[1].trim() : process.env.BREVO_API_KEY;

async function testUpdate() {
    console.log("Testing update on Campaign 205...");

    // Payload to update
    const payload = {
        name: "UPDATED: Pip's Big Parade - Newsletter #1",
        subject: "Ms. Erica has a story for you: Pip's Big Parade",
        sender: {
            name: "Storytime with Ms. Erica",
            email: "ken@mail.thefreebiechannel.com"
        },
        htmlContent: "<h1>Is this updated?</h1><p>Yes it is.</p>"
    };

    const response = await fetch('https://api.brevo.com/v3/emailCampaigns/205', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': BREVO_API_KEY
        },
        body: JSON.stringify(payload)
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
        console.log("✅ Update Successful!");
    } else {
        const text = await response.text();
        console.log("❌ Update Failed Body:", text);
    }
}

testUpdate();
