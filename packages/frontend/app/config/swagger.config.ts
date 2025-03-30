import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Datanaut API",
    version: "1.0.0",
    description:
      "Datanaut is a cloud-based platform that combines the functionality of a spreadsheet with a database, allowing users to organize, collaborate on, and customize data in a visually intuitive interface",
    contact: {
      name: "Angus Dowling",
      email: "angusdowling@protonmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          status: {
            type: "number",
          },
        },
      },
    },
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: [
    "./app/routes/api/**/*.tsx",
    "./app/routes/api/**/*.ts",
    "./app/models/**/*.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
