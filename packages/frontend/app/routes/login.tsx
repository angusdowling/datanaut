import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";

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
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          {!actionData?.success ? (
            <>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded border border-gray-300 px-2 py-1 text-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                {isSubmitting ? "Sending code..." : "Send login code"}
              </button>
            </>
          ) : (
            <>
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification code
                </label>
                <div className="mt-1">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    className="w-full rounded border border-gray-300 px-2 py-1 text-lg"
                    placeholder="Enter 6-digit code"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  We've sent a code to {actionData.email}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                {isSubmitting ? "Verifying..." : "Verify code"}
              </button>
            </>
          )}

          {actionData?.error && (
            <div className="text-sm text-red-600">{actionData.error}</div>
          )}
        </Form>
      </div>
    </div>
  );
}
