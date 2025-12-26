
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/BREVO_API_KEY=(.*)/);
const BREVO_API_KEY = match ? match[1].trim() : process.env.BREVO_API_KEY;

async function deleteCampaigns(startId, endId) {
    if (!BREVO_API_KEY) {
        console.error("Please set BREVO_API_KEY env var");
        return;
    }

    console.log(`Deleting campaigns from ID ${startId} to ${endId}...`);

    for (let id = startId; id <= endId; id++) {
        try {
            console.log(`Deleting campaign ${id}...`);
            const response = await fetch(`https://api.brevo.com/v3/emailCampaigns/${id}`, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY
                }
            });

            if (response.ok) {
                console.log(`✅ Deleted ${id}`);
            } else {
                // If 404, it's already gone, which is fine.
                if (response.status === 404) {
                    console.log(`⚠️  Campaign ${id} not found (might already be deleted).`);
                } else {
                    console.error(`❌ Failed to delete ${id}: ${response.status} ${response.statusText}`);
                }
            }

            // Limit rate
            await new Promise(r => setTimeout(r, 200));

        } catch (error) {
            console.error(`❌ Error deleting ${id}:`, error.message);
        }
    }
    console.log("Cleanup complete.");
}

// Run for the specific batch we created
deleteCampaigns(205, 254);
