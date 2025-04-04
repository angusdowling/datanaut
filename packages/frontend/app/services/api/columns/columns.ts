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
  AppColumn,
  GetApiColumnsParams,
  PostApiColumnsBody,
} from ".././model";

/**
 * Updates properties of an existing column
 * @summary Update a column
 */
export type patchApiColumnsColumnIdResponse200 = {
  data: AppColumn;
  status: 200;
};

export type patchApiColumnsColumnIdResponse400 = {
  data: void;
  status: 400;
};

export type patchApiColumnsColumnIdResponseComposite =
  | patchApiColumnsColumnIdResponse200
  | patchApiColumnsColumnIdResponse400;

export type patchApiColumnsColumnIdResponse =
  patchApiColumnsColumnIdResponseComposite & {
    headers: Headers;
  };

export const getPatchApiColumnsColumnIdUrl = (columnId: string) => {
  return `http://localhost:5173/api/columns/${columnId}`;
};

export const patchApiColumnsColumnId = async (
  columnId: string,
  appColumn: AppColumn,
  options?: RequestInit,
): Promise<patchApiColumnsColumnIdResponse> => {
  const res = await fetch(getPatchApiColumnsColumnIdUrl(columnId), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(appColumn),
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: patchApiColumnsColumnIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as patchApiColumnsColumnIdResponse;
};

export const getPatchApiColumnsColumnIdMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiColumnsColumnId>>,
    TError,
    { columnId: string; data: AppColumn },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiColumnsColumnId>>,
  TError,
  { columnId: string; data: AppColumn },
  TContext
> => {
  const mutationKey = ["patchApiColumnsColumnId"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiColumnsColumnId>>,
    { columnId: string; data: AppColumn }
  > = (props) => {
    const { columnId, data } = props ?? {};

    return patchApiColumnsColumnId(columnId, data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiColumnsColumnIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiColumnsColumnId>>
>;
export type PatchApiColumnsColumnIdMutationBody = AppColumn;
export type PatchApiColumnsColumnIdMutationError = void;

/**
 * @summary Update a column
 */
export const usePatchApiColumnsColumnId = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiColumnsColumnId>>,
    TError,
    { columnId: string; data: AppColumn },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchApiColumnsColumnId>>,
  TError,
  { columnId: string; data: AppColumn },
  TContext
> => {
  const mutationOptions = getPatchApiColumnsColumnIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Permanently deletes a column from a table
 * @summary Delete a column
 */
export type deleteApiColumnsColumnIdResponse200 = {
  data: AppColumn;
  status: 200;
};

export type deleteApiColumnsColumnIdResponse400 = {
  data: void;
  status: 400;
};

export type deleteApiColumnsColumnIdResponseComposite =
  | deleteApiColumnsColumnIdResponse200
  | deleteApiColumnsColumnIdResponse400;

export type deleteApiColumnsColumnIdResponse =
  deleteApiColumnsColumnIdResponseComposite & {
    headers: Headers;
  };

export const getDeleteApiColumnsColumnIdUrl = (columnId: string) => {
  return `http://localhost:5173/api/columns/${columnId}`;
};

export const deleteApiColumnsColumnId = async (
  columnId: string,
  options?: RequestInit,
): Promise<deleteApiColumnsColumnIdResponse> => {
  const res = await fetch(getDeleteApiColumnsColumnIdUrl(columnId), {
    ...options,
    method: "DELETE",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: deleteApiColumnsColumnIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as deleteApiColumnsColumnIdResponse;
};

export const getDeleteApiColumnsColumnIdMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiColumnsColumnId>>,
    TError,
    { columnId: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiColumnsColumnId>>,
  TError,
  { columnId: string },
  TContext
> => {
  const mutationKey = ["deleteApiColumnsColumnId"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiColumnsColumnId>>,
    { columnId: string }
  > = (props) => {
    const { columnId } = props ?? {};

    return deleteApiColumnsColumnId(columnId, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiColumnsColumnIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiColumnsColumnId>>
>;

export type DeleteApiColumnsColumnIdMutationError = void;

/**
 * @summary Delete a column
 */
export const useDeleteApiColumnsColumnId = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiColumnsColumnId>>,
    TError,
    { columnId: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiColumnsColumnId>>,
  TError,
  { columnId: string },
  TContext
> => {
  const mutationOptions = getDeleteApiColumnsColumnIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Get all columns for a table
 */
export type getApiColumnsResponse200 = {
  data: AppColumn[];
  status: 200;
};

export type getApiColumnsResponse400 = {
  data: void;
  status: 400;
};

export type getApiColumnsResponseComposite =
  | getApiColumnsResponse200
  | getApiColumnsResponse400;

export type getApiColumnsResponse = getApiColumnsResponseComposite & {
  headers: Headers;
};

export const getGetApiColumnsUrl = (params: GetApiColumnsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `http://localhost:5173/api/columns?${stringifiedParams}`
    : `http://localhost:5173/api/columns`;
};

export const getApiColumns = async (
  params: GetApiColumnsParams,
  options?: RequestInit,
): Promise<getApiColumnsResponse> => {
  const res = await fetch(getGetApiColumnsUrl(params), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getApiColumnsResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getApiColumnsResponse;
};

export const getGetApiColumnsQueryKey = (params: GetApiColumnsParams) => {
  return [
    `http://localhost:5173/api/columns`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiColumnsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiColumns>>,
  TError = void,
>(
  params: GetApiColumnsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiColumns>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
) => {
  const { query: queryOptions, fetch: fetchOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiColumnsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiColumns>>> = ({
    signal,
  }) => getApiColumns(params, { signal, ...fetchOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiColumns>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiColumnsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiColumns>>
>;
export type GetApiColumnsQueryError = void;

export function useGetApiColumns<
  TData = Awaited<ReturnType<typeof getApiColumns>>,
  TError = void,
>(
  params: GetApiColumnsParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiColumns>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiColumns>>,
          TError,
          Awaited<ReturnType<typeof getApiColumns>>
        >,
        "initialData"
      >;
    fetch?: RequestInit;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiColumns<
  TData = Awaited<ReturnType<typeof getApiColumns>>,
  TError = void,
>(
  params: GetApiColumnsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiColumns>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiColumns>>,
          TError,
          Awaited<ReturnType<typeof getApiColumns>>
        >,
        "initialData"
      >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiColumns<
  TData = Awaited<ReturnType<typeof getApiColumns>>,
  TError = void,
>(
  params: GetApiColumnsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiColumns>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Get all columns for a table
 */

export function useGetApiColumns<
  TData = Awaited<ReturnType<typeof getApiColumns>>,
  TError = void,
>(
  params: GetApiColumnsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiColumns>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiColumnsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Get all columns for a table
 */
export const prefetchGetApiColumns = async <
  TData = Awaited<ReturnType<typeof getApiColumns>>,
  TError = void,
>(
  queryClient: QueryClient,
  params: GetApiColumnsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiColumns>>, TError, TData>
    >;
    fetch?: RequestInit;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetApiColumnsQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * @summary Create a new column
 */
export type postApiColumnsResponse200 = {
  data: AppColumn;
  status: 200;
};

export type postApiColumnsResponse400 = {
  data: void;
  status: 400;
};

export type postApiColumnsResponseComposite =
  | postApiColumnsResponse200
  | postApiColumnsResponse400;

export type postApiColumnsResponse = postApiColumnsResponseComposite & {
  headers: Headers;
};

export const getPostApiColumnsUrl = () => {
  return `http://localhost:5173/api/columns`;
};

export const postApiColumns = async (
  postApiColumnsBody: PostApiColumnsBody,
  options?: RequestInit,
): Promise<postApiColumnsResponse> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append("tableId", postApiColumnsBody.tableId);
  formUrlEncoded.append("data", JSON.stringify(postApiColumnsBody.data));

  const res = await fetch(getPostApiColumnsUrl(), {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...options?.headers,
    },
    body: formUrlEncoded,
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postApiColumnsResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postApiColumnsResponse;
};

export const getPostApiColumnsMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiColumns>>,
    TError,
    { data: PostApiColumnsBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiColumns>>,
  TError,
  { data: PostApiColumnsBody },
  TContext
> => {
  const mutationKey = ["postApiColumns"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiColumns>>,
    { data: PostApiColumnsBody }
  > = (props) => {
    const { data } = props ?? {};

    return postApiColumns(data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiColumnsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiColumns>>
>;
export type PostApiColumnsMutationBody = PostApiColumnsBody;
export type PostApiColumnsMutationError = void;

/**
 * @summary Create a new column
 */
export const usePostApiColumns = <TError = void, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiColumns>>,
    TError,
    { data: PostApiColumnsBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiColumns>>,
  TError,
  { data: PostApiColumnsBody },
  TContext
> => {
  const mutationOptions = getPostApiColumnsMutationOptions(options);

  return useMutation(mutationOptions);
};
