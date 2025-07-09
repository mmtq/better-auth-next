"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  container: `
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #ffffff;
    color: #212529;
  `,
  heading: `
    font-size: 22px;
    margin-bottom: 16px;
    color: #212529;
  `,
  paragraph: `
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 16px;
    color: #4a4a4a;
  `,
  link: `
    display: inline-block;
    margin-top: 20px;
    padding: 12px 20px;
    background-color: #2563eb;
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    border-radius: 6px;
  `,
};


export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `BetterAuthNext - ${subject}`,
    html: `
    <div style="${styles.container}">
      <h1 style="${styles.heading}">${subject}</h1>
      <p style="${styles.paragraph}">${meta.description}</p>
      <a href="${meta.link}" style="${styles.link}">Click Here</a>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}