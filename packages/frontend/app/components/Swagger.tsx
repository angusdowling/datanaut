import { ClientOnly } from "remix-utils/client-only";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const Swagger = () => {
  const SwaggerUIComponent = SwaggerUI as any;

  return (
    <ClientOnly fallback={<div>Loading API documentation...</div>}>
      {() => {
        return <SwaggerUIComponent url="/api/swagger" />;
      }}
    </ClientOnly>
  );
};
