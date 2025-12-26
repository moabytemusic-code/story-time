
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/BREVO_API_KEY=(.*)/);
const BREVO_API_KEY = match ? match[1].trim() : process.env.BREVO_API_KEY;

async function listFolders() {
    console.log("Listing Folders...");

    // There isn't a direct "Campaign Folders" endpoint documented clearly, 
    // but users often confuse Contact Folders with Campaign Folders.
    // However, some undocumented or different endpoints might exist.
    // Let's try to fetch all senders or something similar to see if we can find folder info,
    // OR we just use the manual ID if the user can provide it, 
    // BUT since we are an AI, we can't see the UI.

    // Actually, looking deeper, Brevo (Sendinblue) API v3 DOES NOT support Campaign Folders.
    // It only supports Contact List Folders.

    // IF the user created a "Story Time Newsletter" folder in the *Campaigns* section of the UI,
    // that is likely not accessible via API.

    // Let's print this info to the user.
    console.log("NOTE: Brevo API does not officially support 'Campaign Folders'.");
    console.log("We will try to look for 'contact list folders' just in case that's what was meant.");

    try {
        const response = await fetch('https://api.brevo.com/v3/contacts/folders?limit=50&offset=0', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Contact Folders Found:", JSON.stringify(data, null, 2));
        } else {
            console.log("Failed to list contact folders.");
        }

    } catch (e) {
        console.error(e);
    }
}

listFolders();
