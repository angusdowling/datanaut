import { useQueryClient } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";

const getRoute = (path: string) => {
  const regex = /\/api\/([^\/]+)/;
  const match = path.match(regex);

  if (match) {
    return match[1];
  }
};

export const useCustomMutatorOptions = <T, TError, TData, TContext>(
  options: UseMutationOptions<T, TError, TData, TContext> &
    Required<
      Pick<UseMutationOptions<T, TError, TData, TContext>, "mutationFn">
    >,
  path: { url: string },
  operation: { operationId: string; operationName: string }
) => {
  const queryClient = useQueryClient();

  // Create a new options object with our onSuccess handler
  const newOptions = {
    ...options,
    onSuccess: (data: T, variables: TData, context: TContext) => {
      const route = getRoute(path.url);

      // If this is a cell mutation, invalidate all related queries
      if (route === "cells") {
        // Invalidate all table-related queries
        queryClient.invalidateQueries({ queryKey: ["/api/tables"] });
        queryClient.invalidateQueries({ queryKey: ["/api/rows"] });
        queryClient.invalidateQueries({ queryKey: ["/api/columns"] });
        queryClient.invalidateQueries({ queryKey: ["/api/cells"] });
      } else {
        // For other mutations, just invalidate the specific route
        queryClient.invalidateQueries({ queryKey: [`/api/${route}`] });
      }

      // Call the original onSuccess if it exists
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  };

  return newOptions;
};
