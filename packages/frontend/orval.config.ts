import { defineConfig } from "orval";

export default defineConfig({
  plusalso: {
    output: {
      mode: "tags-split",
      target: "app/services/api",
      schemas: "app/services/api/model",
      client: "react-query",
      baseUrl: "/",
      mock: false,
      override: {
        useNativeEnums: true,
        query: {
          useQuery: true,
          usePrefetch: true,
          // useInfinite: true,
          // useInfiniteQueryParam: "nextId",
          options: {
            staleTime: 10000,
          },
        },
      },
    },
    input: {
      target: "http://localhost:5173/api/swagger/v1/swagger",
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write "app/services/api/**/*.ts"',
    },
  },
});
