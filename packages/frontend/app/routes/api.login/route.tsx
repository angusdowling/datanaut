import { ActionFunction } from "@remix-run/node";
import { createToken } from "~/models/login.server";
import { query } from "~/utilities/db.server";
import { sendEmail } from "~/utilities/mail.server";

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Initiates the login process by sending a verification code
 *     description: Generates a 6-digit code and sends it to the provided email address. The code expires after 15 minutes.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *     responses:
 *       200:
 *         description: Code successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
