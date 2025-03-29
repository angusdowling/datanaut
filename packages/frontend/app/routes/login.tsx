// import { createUserSession } from "~/session.server";
// import { verifyUser } from "~/models/user.server";

// export const action = async ({ request }) => {
//   const form = await request.formData();
//   const email = form.get("email");
//   const password = form.get("password");

//   const user = await verifyUser(email, password);
//   if (!user) throw new Response("Invalid credentials", { status: 401 });

//   return createUserSession({
//     request,
//     userId: user.id,
//     role: user.role,
//     tenantId: user.tenantId,
//     redirectTo: "/dashboard",
//   });
// };
