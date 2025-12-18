import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        const { parentName, childName, email, message } = body;

        // Validations
        if (!parentName || !email || !message) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Configure Brevo (Sendinblue) Transporter
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.BREVO_USER, // Your Brevo login email
                pass: process.env.BREVO_SMTP_KEY, // Your Master Password or SMTP Key
            },
        });

        // Email Content
        const mailOptions = {
            from: `"Story Time Contact" <${process.env.BREVO_USER}>`, // MUST be your verified sender
            replyTo: email, // This allows you to hit reply and send to the user
            to: process.env.BREVO_USER, // Your email address where you want to receive inquiries
            subject: `New Message from ${parentName} (Story Time)`,
            text: `
                New Contact Form Submission:
                
                Parent: ${parentName}
                Child: ${childName || 'N/A'}
                Email: ${email}
                
                Message:
                ${message}
            `,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Parent:</strong> ${parentName}</p>
                <p><strong>Child:</strong> ${childName || 'N/A'}</p>
                <p><strong>Email:</strong> ${email}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("Email Error:", error);
        return NextResponse.json({ message: "Error sending email." }, { status: 500 });
    }
}
