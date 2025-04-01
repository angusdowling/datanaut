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

import type { PostApiTenantsBody, Tenant } from ".././model";

/**
 * Returns a list of all tenants accessible to the user.
 * @summary Get all tenants
 */
export const getApiTenants = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Tenant[]>> => {
  return axios.get(`/api/api/tenants`, options);
};

export const getGetApiTenantsQueryKey = () => {
  return [`/api/api/tenants`] as const;
};

export const getGetApiTenantsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiTenants>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiTenants>>, TError, TData>
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiTenantsQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiTenants>>> = ({
    signal,
  }) => getApiTenants({ signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiTenants>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiTenantsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiTenants>>
>;
export type GetApiTenantsQueryError = AxiosError<unknown>;

export function useGetApiTenants<
  TData = Awaited<ReturnType<typeof getApiTenants>>,
  TError = AxiosError<unknown>,
>(options: {
  query: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiTenants>>, TError, TData>
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiTenants>>,
        TError,
        Awaited<ReturnType<typeof getApiTenants>>
      >,
      "initialData"
    >;
  axios?: AxiosRequestConfig;
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiTenants<
  TData = Awaited<ReturnType<typeof getApiTenants>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiTenants>>, TError, TData>
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiTenants>>,
        TError,
        Awaited<ReturnType<typeof getApiTenants>>
      >,
      "initialData"
    >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiTenants<
  TData = Awaited<ReturnType<typeof getApiTenants>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiTenants>>, TError, TData>
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Get all tenants
 */

export function useGetApiTenants<
  TData = Awaited<ReturnType<typeof getApiTenants>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiTenants>>, TError, TData>
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiTenantsQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Get all tenants
 */
export const prefetchGetApiTenants = async <
  TData = Awaited<ReturnType<typeof getApiTenants>>,
  TError = AxiosError<unknown>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiTenants>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetApiTenantsQueryOptions(options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * @summary Create a new tenant
 */
export const postApiTenants = (
  postApiTenantsBody: PostApiTenantsBody,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Tenant>> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append("data", JSON.stringify(postApiTenantsBody.data));

  return axios.post(`/api/api/tenants`, formUrlEncoded, options);
};

export const getPostApiTenantsMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiTenants>>,
    TError,
    { data: PostApiTenantsBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiTenants>>,
  TError,
  { data: PostApiTenantsBody },
  TContext
> => {
  const mutationKey = ["postApiTenants"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiTenants>>,
    { data: PostApiTenantsBody }
  > = (props) => {
    const { data } = props ?? {};

    return postApiTenants(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiTenantsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiTenants>>
>;
export type PostApiTenantsMutationBody = PostApiTenantsBody;
export type PostApiTenantsMutationError = AxiosError<void>;

/**
 * @summary Create a new tenant
 */
export const usePostApiTenants = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiTenants>>,
    TError,
    { data: PostApiTenantsBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiTenants>>,
  TError,
  { data: PostApiTenantsBody },
  TContext
> => {
  const mutationOptions = getPostApiTenantsMutationOptions(options);

  return useMutation(mutationOptions);
};
