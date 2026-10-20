import nodemailer from "nodemailer";

// Inisialisasi Transporter SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendResetEmailParams {
  user: {
    email: string;
    name?: string | null;
  };
  url: string;
}

export const sendResetPasswordEmail = async ({
  user,
  url,
}: SendResetEmailParams) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || '"Chistix Support" <no-reply@chistix.com>',
    to: user.email,
    subject: "Reset Password - Chistix",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #f89c1e; font-size: 28px; font-weight: 900; margin: 0; tracking-tight: -0.05em;">CHISTIX</h1>
        </div>
        
        <h2 style="color: #111827; font-size: 18px; font-weight: 700; margin-bottom: 12px;">
          Reset Password Confirmation
        </h2>
        
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          Halo <strong>${user.name || "Chistix"}</strong>,<br/>
          Please press this button to Reset your password:
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${url}" 
             style="background-color: #f89c1e; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(248, 156, 30, 0.3);">
            Reset Password
          </a>
        </div>

      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};