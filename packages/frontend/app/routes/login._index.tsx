import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";
import { postAuthLogin } from "~/services/api/auth/auth";

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString().toLowerCase();

  if (!email) {
    throw new Response("Email is required", { status: 400 });
  }

  const response = await postAuthLogin({ email });

  // Redirect to verify page with email as URL parameter
  return redirect(`/verify?email=${encodeURIComponent(email)}`);
};

export default function LoginPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h1>Log in to your account</h1>
      <Form method="post" id="login">
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

        {actionData?.error && <div>{actionData.error}</div>}
      </Form>
    </div>
  );
}
