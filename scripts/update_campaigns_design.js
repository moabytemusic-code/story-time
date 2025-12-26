
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/BREVO_API_KEY=(.*)/);
const BREVO_API_KEY = match ? match[1].trim() : process.env.BREVO_API_KEY;

// Base Design Template function
function generateEmailHTML(title, body, link, storyTitle, parentingTip) {
    // Extracting greeting from body (assumes body starts with <p>Hi Mom/Parent,</p>)
    let greeting = "";
    let mainText = body;
    let tipTitle = "Ms. Erica's Parenting Tip";
    let tipContent = "";

    // Simple parsing to fit the structured design template
    // We are reconstructing the 'body' from JSON into the 'designed' format

    // 1. Get Greeting
    const pStart = body.indexOf('<p>');
    const pEnd = body.indexOf('</p>');
    if (pStart > -1 && pEnd > -1) {
        greeting = body.substring(pStart + 3, pEnd); // "Hi Mom,"
        mainText = body.substring(pEnd + 4); // The rest
    }

    // 2. Extract Tip
    const tipStart = mainText.indexOf('<h3>');
    if (tipStart > -1) {
        // Everything after <h3> is the tip section
        const tipSection = mainText.substring(tipStart);
        mainText = mainText.substring(0, tipStart); // Text before the tip

        // Clean up tip content (remove h3, etc if needed, but we keep the structure inside the box)
        tipContent = tipSection.replace("<h3>Ms. Erica's Parenting Tip</h3>", ""); // Remove title as we hardcode it in design
    }

    // 3. Remove Title from main text if present (<h1>)
    mainText = mainText.replace(/<h1>.*?<\/h1>/g, "");

    // 4. Clean up link (remove <br/><a href...>) because we use a button
    const linkStart = mainText.indexOf('<a href');
    if (linkStart > -1) {
        mainText = mainText.substring(0, linkStart); // Remove link from text
    }
    mainText = mainText.replace(/<br\/>$/, ""); // Remove trailing break

    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f9fc; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%); padding: 40px 20px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 10px 0 0; opacity: 0.9; font-size: 16px; }
    .content { padding: 40px 30px; color: #4a5568; line-height: 1.6; }
    .greeting { font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 20px; }
    .story-card { background: #f7fafc; border: 1px solid #edf2f7; border-radius: 12px; padding: 25px; margin: 25px 0; }
    .story-title { color: #5a67d8; font-size: 22px; font-weight: 700; margin-top: 0; }
    .tip-box { background-color: #fff5f5; border-left: 4px solid #fc8181; padding: 20px; margin-top: 30px; border-radius: 4px; }
    .tip-header { color: #c53030; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .btn { display: inline-block; background-color: #48bb78; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 600; margin-top: 20px; text-align: center; box-shadow: 0 4px 6px rgba(72, 187, 120, 0.3); transition: transform 0.2s; }
    .btn:hover { transform: translateY(-2px); }
    .footer { text-align: center; padding: 30px; color: #718096; font-size: 13px; background: #f7fafc; border-top: 1px solid #edf2f7; }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <img src="https://storytime.com/images/logo.png" alt="Storytime Logo" width="120" style="margin-bottom: 15px; border-radius: 50%;">
        <h1>Storytime with Ms. Erica</h1>
        <p>Weekly stories to spark their imagination</p>
    </div>
    <div class="content">
        <div class="greeting">${greeting}</div>
        
        ${mainText}

        <div class="story-card">
            <h2 class="story-title">📖 ${storyTitle}</h2>
            <p>Read or listen to this week's featured story together!</p>
        </div>

        <div style="text-align: center;">
            <a href="${link}" class="btn">Read or Listen Now</a>
        </div>

        <div class="tip-box">
            <div class="tip-header">${tipTitle}</div>
            ${tipContent}
        </div>
    </div>
    <div class="footer">
        <p>You received this email because you are part of the Storytime family.</p>
        <p>© 2025 Storytime. All rights reserved.</p>
    </div>
</div>
</body>
</html>
    `;
}

async function updateCampaigns() {
    console.log("Starting DESIGN update...");

    const newslettersPath = path.join(process.cwd(), 'data', 'newsletters.json');
    const newsletters = JSON.parse(fs.readFileSync(newslettersPath, 'utf8'));

    // IDs start at 205
    const START_ID = 205;

    // Constants
    const SENDER = {
        name: "Storytime with Ms. Erica",
        email: "info@storytimewithmserica.com"
    };

    for (let i = 0; i < newsletters.length; i++) {
        const item = newsletters[i];
        const campaignId = START_ID + i;

        // Generate the beautiful HTML
        // Extract link from item.body text or construct it
        // In json we put localhost link: <a href='http://localhost:3000/stories/1'>

        let link = "https://storytime.com/stories"; // Full fallback
        const linkMatch = item.body.match(/href='(.*?)'/);
        if (linkMatch) {
            link = linkMatch[1];
            // Ensure production link if possible, but user asked to fix 404 in preview. 
            // We will stick to the link in the JSON which is now http://localhost:3000/stories/X
            // For a real production campaign, this should be storytime.com. 
            // I will replace localhost with storytime.com for the EMAIL version so it works for real users.
            link = link.replace("http://localhost:3000", "https://storytime.com");
        }

        const beautifulHtml = generateEmailHTML(item.title, item.body, link, item.title);

        const payload = {
            name: `${item.title} - Newsletter #${i + 1}`,
            subject: item.subject,
            sender: SENDER,
            htmlContent: beautifulHtml,
            tags: ["Storytime Series", "Weekly Newsletter"]
        };

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
                    console.log("Rate limited. Waiting 20 seconds...");
                    await new Promise(r => setTimeout(r, 20000));
                    i--; // Retry this one
                    continue;
                }
            }

            // Wait 5 seconds between calls to avoid 429
            await new Promise(r => setTimeout(r, 5000));

        } catch (error) {
            console.error(`❌ Error updating ${campaignId}:`, error.message);
        }
    }

    console.log("Done updating campaigns.");
}

updateCampaigns();
