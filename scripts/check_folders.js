
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/BREVO_API_KEY=(.*)/);
const BREVO_API_KEY = match ? match[1].trim() : process.env.BREVO_API_KEY;

async function checkFolders() {
    console.log("Checking for 'emailCampaigns/folders'...");

    try {
        const response = await fetch('https://api.brevo.com/v3/emailCampaigns/folders', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY
            }
        });

        console.log(`Status: ${response.status}`);
        if (response.ok) {
            const data = await response.json();
            console.log("Folders found:", JSON.stringify(data, null, 2));
        } else {
            const text = await response.text();
            console.log("Response:", text);
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

checkFolders();
