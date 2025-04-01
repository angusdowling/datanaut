import { ActionFunction } from "@remix-run/node";
import { createToken } from "~/models/login.server";
import { query } from "~/utilities/db.server";
import { sendEmail } from "~/utilities/mail.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("login.tsx", request);
  const form = await request.formData();
  const email = form.get("email")?.toString().toLowerCase();

  if (!email) {
    throw new Response("Email is required", { status: 400 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  console.log("creating token");
  await query(async (db) => {
    await createToken(db, email, code, expiresAt);
  });

  // Send code via email or SMS
  console.log("sending email");
  await sendEmail({
    to: email,
    subject: "Your Login Code",
    text: `Your code is ${code}`,
  });

  return Response.json({ success: true });
};
