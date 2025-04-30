import { defineConfig } from "orval";

export default defineConfig({
  plusalso: {
    output: {
      mode: "tags-split",
      target: "app/services/api",
      schemas: "app/services/api/model",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: {
        getBaseUrlFromSpecification: false,
        baseUrl: "/api",
      },
      mock: false,
      override: {
        useNativeEnums: true,
        query: {
          useQuery: true,
          usePrefetch: true,
          options: {
            staleTime: 10000,
          },
        },
        mutator: {
          path: "./app/utilities/api.ts",
          name: "customFetch",
        },
      },
    },
    input: {
      target: "http://localhost:5104/swagger/v1/swagger.json",
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write "app/services/api/**/*.ts"',
    },
  },
});
