
// Usage: node scripts/test-create-campaign.js

async function testCreateCampaign() {
    const API_URL = 'http://localhost:3000/api/campaigns';

    console.log(`Testing Campaign Creation API at ${API_URL}...`);

    const payload = {
        name: `Test Campaign ${new Date().toISOString()}`,
        subject: "Weekly Story Time Newsletter",
        sender: {
            name: "Story Time Team",
            email: "ken@mail.thefreebiechannel.com"
        },
        htmlContent: "<h1>Hello from Story Time!</h1><p>Here are this week's top stories...</p>",
        recipients: [50], // Using List ID 50 as seen in other files
        scheduledAt: new Date(Date.now() + 86400000).toISOString() // 24 hours from now
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log("Response Status:", response.status);
        console.log("Response Data:", JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log("✅ Campaign created successfully!");
        } else {
            console.log("❌ Failed to create campaign.");
        }

    } catch (error) {
        console.error("Test failed:", error);
    }
}

testCreateCampaign();
