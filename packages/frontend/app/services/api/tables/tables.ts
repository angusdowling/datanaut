/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Datanaut API
 * Datanaut is a cloud-based platform that combines the functionality of a spreadsheet with a database, allowing users to organize, collaborate on, and customize data in a visually intuitive interface
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  AppTable,
  GetApiTablesParams,
  PostApiTablesBody,
} from ".././model";

/**
 * Updates properties of an existing table
 * @summary Update a table
 */
export type patchApiTablesTableIdResponse200 = {
  data: AppTable;
  status: 200;
};

export type patchApiTablesTableIdResponse400 = {
  data: void;
  status: 400;
};

export type patchApiTablesTableIdResponseComposite =
  | patchApiTablesTableIdResponse200
  | patchApiTablesTableIdResponse400;

export type patchApiTablesTableIdResponse =
  patchApiTablesTableIdResponseComposite & {
    headers: Headers;
  };

export const getPatchApiTablesTableIdUrl = (tableId: string) => {
  return `http://localhost:5173/api/tables/${tableId}`;
};

export const patchApiTablesTableId = async (
  tableId: string,
  appTable: AppTable,
  options?: RequestInit,
): Promise<patchApiTablesTableIdResponse> => {
  const res = await fetch(getPatchApiTablesTableIdUrl(tableId), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(appTable),
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: patchApiTablesTableIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as patchApiTablesTableIdResponse;
};

export const getPatchApiTablesTableIdMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiTablesTableId>>,
    TError,
    { tableId: string; data: AppTable },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiTablesTableId>>,
  TError,
  { tableId: string; data: AppTable },
  TContext
> => {
  const mutationKey = ["patchApiTablesTableId"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiTablesTableId>>,
    { tableId: string; data: AppTable }
  > = (props) => {
    const { tableId, data } = props ?? {};

    return patchApiTablesTableId(tableId, data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiTablesTableIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiTablesTableId>>
>;
export type PatchApiTablesTableIdMutationBody = AppTable;
export type PatchApiTablesTableIdMutationError = void;

/**
 * @summary Update a table
 */
export const usePatchApiTablesTableId = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiTablesTableId>>,
    TError,
    { tableId: string; data: AppTable },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchApiTablesTableId>>,
  TError,
  { tableId: string; data: AppTable },
  TContext
> => {
  const mutationOptions = getPatchApiTablesTableIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Permanently deletes a table and all its associated data
 * @summary Delete a table
 */
export type deleteApiTablesTableIdResponse200 = {
  data: AppTable;
  status: 200;
};

export type deleteApiTablesTableIdResponse400 = {
  data: void;
  status: 400;
};

export type deleteApiTablesTableIdResponseComposite =
  | deleteApiTablesTableIdResponse200
  | deleteApiTablesTableIdResponse400;

export type deleteApiTablesTableIdResponse =
  deleteApiTablesTableIdResponseComposite & {
    headers: Headers;
  };

export const getDeleteApiTablesTableIdUrl = (tableId: string) => {
  return `http://localhost:5173/api/tables/${tableId}`;
};

export const deleteApiTablesTableId = async (
  tableId: string,
  options?: RequestInit,
): Promise<deleteApiTablesTableIdResponse> => {
  const res = await fetch(getDeleteApiTablesTableIdUrl(tableId), {
    ...options,
    method: "DELETE",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: deleteApiTablesTableIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as deleteApiTablesTableIdResponse;
};

export const getDeleteApiTablesTableIdMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiTablesTableId>>,
    TError,
    { tableId: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiTablesTableId>>,
  TError,
  { tableId: string },
  TContext
> => {
  const mutationKey = ["deleteApiTablesTableId"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiTablesTableId>>,
    { tableId: string }
  > = (props) => {
    const { tableId } = props ?? {};

    return deleteApiTablesTableId(tableId, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiTablesTableIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiTablesTableId>>
>;

export type DeleteApiTablesTableIdMutationError = void;

/**
 * @summary Delete a table
 */
export const useDeleteApiTablesTableId = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiTablesTableId>>,
    TError,
    { tableId: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiTablesTableId>>,
  TError,
  { tableId: string },
  TContext
> => {
  const mutationOptions = getDeleteApiTablesTableIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Get all tables for a workspace
 */
export type getApiTablesResponse200 = {
  data: AppTable[];
  status: 200;
};

export type getApiTablesResponse400 = {
  data: void;
  status: 400;
};

export type getApiTablesResponseComposite =
  | getApiTablesResponse200
  | getApiTablesResponse400;

export type getApiTablesResponse = getApiTablesResponseComposite & {
  headers: Headers;
};

export const getGetApiTablesUrl = (params: GetApiTablesParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `http://localhost:5173/api/tables?${stringifiedParams}`
    : `http://localhost:5173/api/tables`;
};

export const getApiTables = async (
  params: GetApiTablesParams,
  options?: RequestInit,
): Promise<getApiTablesResponse> => {
  const res = await fetch(getGetApiTablesUrl(params), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getApiTablesResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getApiTablesResponse;
};

export const getGetApiTablesQueryKey = (params: GetApiTablesParams) => {
  return [
    `http://localhost:5173/api/tables`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiTablesQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = void,
>(
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
) => {
  const { query: queryOptions, fetch: fetchOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiTablesQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiTables>>> = ({
    signal,
  }) => getApiTables(params, { signal, ...fetchOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiTables>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiTablesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiTables>>
>;
export type GetApiTablesQueryError = void;

export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = void,
>(
  params: GetApiTablesParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiTables>>,
          TError,
          Awaited<ReturnType<typeof getApiTables>>
        >,
        "initialData"
      >;
    fetch?: RequestInit;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = void,
>(
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiTables>>,
          TError,
          Awaited<ReturnType<typeof getApiTables>>
        >,
        "initialData"
      >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = void,
>(
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Get all tables for a workspace
 */

export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = void,
>(
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiTablesQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Get all tables for a workspace
 */
export const prefetchGetApiTables = async <
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = void,
>(
  queryClient: QueryClient,
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetApiTablesQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * @summary Create a new table
 */
export type postApiTablesResponse200 = {
  data: AppTable;
  status: 200;
};

export type postApiTablesResponse400 = {
  data: void;
  status: 400;
};

export type postApiTablesResponseComposite =
  | postApiTablesResponse200
  | postApiTablesResponse400;

export type postApiTablesResponse = postApiTablesResponseComposite & {
  headers: Headers;
};

export const getPostApiTablesUrl = () => {
  return `http://localhost:5173/api/tables`;
};

export const postApiTables = async (
  postApiTablesBody: PostApiTablesBody,
  options?: RequestInit,
): Promise<postApiTablesResponse> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append("workspaceId", postApiTablesBody.workspaceId);
  formUrlEncoded.append("name", postApiTablesBody.name);

  const res = await fetch(getPostApiTablesUrl(), {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...options?.headers,
    },
    body: formUrlEncoded,
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postApiTablesResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postApiTablesResponse;
};

export const getPostApiTablesMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiTables>>,
    TError,
    { data: PostApiTablesBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiTables>>,
  TError,
  { data: PostApiTablesBody },
  TContext
> => {
  const mutationKey = ["postApiTables"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiTables>>,
    { data: PostApiTablesBody }
  > = (props) => {
    const { data } = props ?? {};

    return postApiTables(data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiTablesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiTables>>
>;
export type PostApiTablesMutationBody = PostApiTablesBody;
export type PostApiTablesMutationError = void;

/**
 * @summary Create a new table
 */
export const usePostApiTables = <TError = void, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiTables>>,
    TError,
    { data: PostApiTablesBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiTables>>,
  TError,
  { data: PostApiTablesBody },
  TContext
> => {
  const mutationOptions = getPostApiTablesMutationOptions(options);

  return useMutation(mutationOptions);
};
