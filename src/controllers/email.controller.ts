import nodemailer from "nodemailer";
import handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const otpEmailTemplate = `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
  <h2 style="color: #f58200;">Verifikasi Akun Chistix Anda</h2>
  <p>Halo <b>{{name}}</b>, klik tombol di bawah ini untuk mengaktifkan akun Anda:</p>
  
  <a href="{{url}}" style="display: inline-block; background-color: #f58200; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
    Verifikasi Email Saya
  </a>
</div>
`;

export const sendVerificationEmailLink = async (
  email: string,
  name: string,
  url: string,
) => {
  try {
    const template = handlebars.compile(otpEmailTemplate);
    const htmlContent = template({ name, url });
    return await transporter.sendMail({
      from: '"Chistix-verifteam" <noreply@chistix.id',
      to: email,
      subject: "Aktivasi Akun Chistix",
      html: htmlContent,
    });
  } catch (error) {
    throw (new Error("gagal mengirim email OTP"), error);
  }
};
