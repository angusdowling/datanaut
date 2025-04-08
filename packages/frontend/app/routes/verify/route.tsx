import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";
import { postApiVerify } from "~/services/api/authentication/authentication";

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const code = formData.get("code")?.toString();

  if (!code) {
    return Response.json({ error: "Verification code is required" });
  }

  const response = await postApiVerify({ code });

  console.log(response);

  if (response.data?.status === 400) {
    return Response.json({ error: "Invalid or expired code" });
  }

  // After successful verification, redirect to the home page
  // while preserving the authentication headers
  const redirectResponse = redirect("/dashboard", {
    status: 302,
  });

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    redirectResponse.headers.set("set-cookie", setCookie);
  }

  return redirectResponse;
};

export default function VerifyPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h1>Verify your email</h1>
      <Form method="post" id="verify">
        <div>
          <label htmlFor="code">Verification code</label>
          <div>
            <input
              id="code"
              name="code"
              type="text"
              required
              placeholder="Enter 6-digit code"
              autoComplete="off"
            />
          </div>
          <p>We've sent a code</p>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify code"}
        </button>

        {actionData?.error && <div>{actionData.error}</div>}
      </Form>
    </div>
  );
}
