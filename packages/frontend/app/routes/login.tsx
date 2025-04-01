import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";

type ActionData = {
  error?: string;
  success?: boolean;
  email?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString().toLowerCase();
  const code = formData.get("code")?.toString();

  if (!code) {
    if (!email) {
      throw new Response("Email is required", { status: 400 });
    }

    // First step: send login email
    const response = await fetch("http://localhost:5173/api/login", {
      method: "POST",
      body: new URLSearchParams({ email }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log(response);

    if (!response.ok) {
      throw new Response("Failed to send login code", { status: 400 });
    }

    return Response.json({ success: true, email });
  }

  // Second step: verify code
  const response = await fetch("http://localhost:5173/api/verify", {
    method: "POST",
    body: new URLSearchParams({ code }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  console.log(response);

  if (!response.ok) {
    throw new Response("Invalid or expired code", { status: 400 });
  }

  return new Response("", { headers: response.headers, status: 200 });
};

export default function LoginPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <div>
        <Form method="post">
          {!actionData?.success ? (
            <>
              <div>
                <label htmlFor="email">Email address</label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending code..." : "Send login code"}
              </button>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="code">Verification code</label>
                <div>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                  />
                </div>
                <p>We've sent a code to {actionData.email}</p>
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify code"}
              </button>
            </>
          )}

          {actionData?.error && <div>{actionData.error}</div>}
        </Form>
      </div>
    </div>
  );
}
