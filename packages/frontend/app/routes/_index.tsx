import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireAuth } from "~/utilities/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut" },
    {
      name: "description",
      content:
        "Datanaut is a cloud-based platform that combines the functionality of a spreadsheet with a database, allowing users to organize, collaborate on, and customize data in a visually intuitive interface",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Try to get authenticated user
    // const response = await requireAuth(request);
    // console.log("RESPONSE", response);
    // If successful, redirect to dashboard
    return redirect("/dashboard");
  } catch (error) {
    // If not authenticated, redirect to login
    console.log("ERROR", error);
    // return redirect("/login");
  }
};

export default function Index() {
  // This component won't be rendered due to the loader redirects
  return null;
}
