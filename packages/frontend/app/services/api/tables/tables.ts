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

import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import type {
  AppTable,
  GetApiTablesParams,
  PostApiTablesBody,
} from ".././model";

/**
 * Updates properties of an existing table
 * @summary Update a table
 */
export const patchApiTablesTableId = (
  tableId: string,
  appTable: AppTable,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<AppTable>> => {
  return axios.patch(`/api/tables/${tableId}`, appTable, options);
};

export const getPatchApiTablesTableIdMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiTablesTableId>>,
    TError,
    { tableId: string; data: AppTable },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiTablesTableId>>,
  TError,
  { tableId: string; data: AppTable },
  TContext
> => {
  const mutationKey = ["patchApiTablesTableId"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiTablesTableId>>,
    { tableId: string; data: AppTable }
  > = (props) => {
    const { tableId, data } = props ?? {};

    return patchApiTablesTableId(tableId, data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiTablesTableIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiTablesTableId>>
>;
export type PatchApiTablesTableIdMutationBody = AppTable;
export type PatchApiTablesTableIdMutationError = AxiosError<void>;

/**
 * @summary Update a table
 */
export const usePatchApiTablesTableId = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiTablesTableId>>,
    TError,
    { tableId: string; data: AppTable },
    TContext
  >;
  axios?: AxiosRequestConfig;
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
export const deleteApiTablesTableId = (
  tableId: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<AppTable>> => {
  return axios.delete(`/api/tables/${tableId}`, options);
};

export const getDeleteApiTablesTableIdMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiTablesTableId>>,
    TError,
    { tableId: string },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiTablesTableId>>,
  TError,
  { tableId: string },
  TContext
> => {
  const mutationKey = ["deleteApiTablesTableId"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiTablesTableId>>,
    { tableId: string }
  > = (props) => {
    const { tableId } = props ?? {};

    return deleteApiTablesTableId(tableId, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiTablesTableIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiTablesTableId>>
>;

export type DeleteApiTablesTableIdMutationError = AxiosError<void>;

/**
 * @summary Delete a table
 */
export const useDeleteApiTablesTableId = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiTablesTableId>>,
    TError,
    { tableId: string },
    TContext
  >;
  axios?: AxiosRequestConfig;
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
export const getApiTables = (
  params: GetApiTablesParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<AppTable[]>> => {
  return axios.get(`/api/tables`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetApiTablesQueryKey = (params: GetApiTablesParams) => {
  return [`/api/tables`, ...(params ? [params] : [])] as const;
};

export const getGetApiTablesQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = AxiosError<void>,
>(
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiTablesQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiTables>>> = ({
    signal,
  }) => getApiTables(params, { signal, ...axiosOptions });

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
export type GetApiTablesQueryError = AxiosError<void>;

export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = AxiosError<void>,
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
    axios?: AxiosRequestConfig;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = AxiosError<void>,
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
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = AxiosError<void>,
>(
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Get all tables for a workspace
 */

export function useGetApiTables<
  TData = Awaited<ReturnType<typeof getApiTables>>,
  TError = AxiosError<void>,
>(
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
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
  TError = AxiosError<void>,
>(
  queryClient: QueryClient,
  params: GetApiTablesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTables>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetApiTablesQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * @summary Create a new table
 */
export const postApiTables = (
  postApiTablesBody: PostApiTablesBody,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<AppTable>> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append("workspaceId", postApiTablesBody.workspaceId);
  formUrlEncoded.append("name", postApiTablesBody.name);

  return axios.post(`/api/tables`, formUrlEncoded, options);
};

export const getPostApiTablesMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiTables>>,
    TError,
    { data: PostApiTablesBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiTables>>,
  TError,
  { data: PostApiTablesBody },
  TContext
> => {
  const mutationKey = ["postApiTables"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiTables>>,
    { data: PostApiTablesBody }
  > = (props) => {
    const { data } = props ?? {};

    return postApiTables(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiTablesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiTables>>
>;
export type PostApiTablesMutationBody = PostApiTablesBody;
export type PostApiTablesMutationError = AxiosError<void>;

/**
 * @summary Create a new table
 */
export const usePostApiTables = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiTables>>,
    TError,
    { data: PostApiTablesBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiTables>>,
  TError,
  { data: PostApiTablesBody },
  TContext
> => {
  const mutationOptions = getPostApiTablesMutationOptions(options);

  return useMutation(mutationOptions);
};
