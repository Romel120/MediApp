import nodemailer from 'nodemailer';
import Doctor from "@/lib/models/doctor";
import Patient from "@/lib/models/patient";

export const sendEmail = async({ email, emailType, userId, token }) => {
    try {
        const model = emailType === "VERIFY Doctor" ? Doctor : Patient;

        await model.findByIdAndUpdate(userId, {
            verifyToken: token, 
            verifyTokenExpiry: Date.now() + 3600000 // 1 hour expiry
        });

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: 'noreply@example.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${token}&type=${emailType === "VERIFY Doctor" ? "doctor" : "patient"}">here</a> to verify your email.</p>`
        };

        await transport.sendMail(mailOptions);
    } catch (error) {
        throw new Error(error.message);
    }
};
