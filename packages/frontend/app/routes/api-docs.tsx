import { LoaderFunction } from "@remix-run/node";
import { swaggerSpec } from "~/config/swagger.config";

export const loader: LoaderFunction = async () => {
  return new Response(JSON.stringify(swaggerSpec), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
