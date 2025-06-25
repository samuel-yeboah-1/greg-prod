import nodemailer from "nodemailer";

export async function sendInterestEmail({ email }: { email: string }) {
  if (!email) throw new Error("Email is required");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Thank you for registering your interest!",
    text: "We have received your interest. We'll be in touch soon.",
    html: `<p>We have received your interest. We'll be in touch soon.</p>`
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}