import nodemailer from "nodemailer";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

type Email = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: Email) {
  await transporter.sendMail({
    from: '"Datanaut" <noreply@e.datanaut.com>',
    to,
    subject,
    text,
  });
}
