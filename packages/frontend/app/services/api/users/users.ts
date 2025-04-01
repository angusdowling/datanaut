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
  GetApiUsersParams,
  PatchApiUsersUserIdBody,
  PostApiUsersBody,
  User,
} from ".././model";

/**
 * @summary Update a user
 */
export const patchApiUsersUserId = (
  userId: string,
  patchApiUsersUserIdBody: PatchApiUsersUserIdBody,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<User>> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append("data", JSON.stringify(patchApiUsersUserIdBody.data));

  return axios.patch(`/api/users/${userId}`, formUrlEncoded, options);
};

export const getPatchApiUsersUserIdMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiUsersUserId>>,
    TError,
    { userId: string; data: PatchApiUsersUserIdBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiUsersUserId>>,
  TError,
  { userId: string; data: PatchApiUsersUserIdBody },
  TContext
> => {
  const mutationKey = ["patchApiUsersUserId"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiUsersUserId>>,
    { userId: string; data: PatchApiUsersUserIdBody }
  > = (props) => {
    const { userId, data } = props ?? {};

    return patchApiUsersUserId(userId, data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiUsersUserIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiUsersUserId>>
>;
export type PatchApiUsersUserIdMutationBody = PatchApiUsersUserIdBody;
export type PatchApiUsersUserIdMutationError = AxiosError<void>;

/**
 * @summary Update a user
 */
export const usePatchApiUsersUserId = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiUsersUserId>>,
    TError,
    { userId: string; data: PatchApiUsersUserIdBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchApiUsersUserId>>,
  TError,
  { userId: string; data: PatchApiUsersUserIdBody },
  TContext
> => {
  const mutationOptions = getPatchApiUsersUserIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Delete a user
 */
export const deleteApiUsersUserId = (
  userId: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<User>> => {
  return axios.delete(`/api/users/${userId}`, options);
};

export const getDeleteApiUsersUserIdMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiUsersUserId>>,
    TError,
    { userId: string },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiUsersUserId>>,
  TError,
  { userId: string },
  TContext
> => {
  const mutationKey = ["deleteApiUsersUserId"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiUsersUserId>>,
    { userId: string }
  > = (props) => {
    const { userId } = props ?? {};

    return deleteApiUsersUserId(userId, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiUsersUserIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiUsersUserId>>
>;

export type DeleteApiUsersUserIdMutationError = AxiosError<void>;

/**
 * @summary Delete a user
 */
export const useDeleteApiUsersUserId = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiUsersUserId>>,
    TError,
    { userId: string },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiUsersUserId>>,
  TError,
  { userId: string },
  TContext
> => {
  const mutationOptions = getDeleteApiUsersUserIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Returns a list of users, optionally filtered by tenantId or email
 * @summary Get all users
 */
export const getApiUsers = (
  params?: GetApiUsersParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<User[]>> => {
  return axios.get(`/api/users`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetApiUsersQueryKey = (params?: GetApiUsersParams) => {
  return [`/api/users`, ...(params ? [params] : [])] as const;
};

export const getGetApiUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiUsers>>,
  TError = AxiosError<unknown>,
>(
  params?: GetApiUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiUsersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiUsers>>> = ({
    signal,
  }) => getApiUsers(params, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiUsers>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiUsersQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiUsers>>
>;
export type GetApiUsersQueryError = AxiosError<unknown>;

export function useGetApiUsers<
  TData = Awaited<ReturnType<typeof getApiUsers>>,
  TError = AxiosError<unknown>,
>(
  params: undefined | GetApiUsersParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsers>>,
          TError,
          Awaited<ReturnType<typeof getApiUsers>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiUsers<
  TData = Awaited<ReturnType<typeof getApiUsers>>,
  TError = AxiosError<unknown>,
>(
  params?: GetApiUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsers>>,
          TError,
          Awaited<ReturnType<typeof getApiUsers>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiUsers<
  TData = Awaited<ReturnType<typeof getApiUsers>>,
  TError = AxiosError<unknown>,
>(
  params?: GetApiUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Get all users
 */

export function useGetApiUsers<
  TData = Awaited<ReturnType<typeof getApiUsers>>,
  TError = AxiosError<unknown>,
>(
  params?: GetApiUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiUsersQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Get all users
 */
export const prefetchGetApiUsers = async <
  TData = Awaited<ReturnType<typeof getApiUsers>>,
  TError = AxiosError<unknown>,
>(
  queryClient: QueryClient,
  params?: GetApiUsersParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetApiUsersQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * @summary Create a new user
 */
export const postApiUsers = (
  postApiUsersBody: PostApiUsersBody,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<User>> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append("data", JSON.stringify(postApiUsersBody.data));
  formUrlEncoded.append("tenantId", postApiUsersBody.tenantId);

  return axios.post(`/api/users`, formUrlEncoded, options);
};

export const getPostApiUsersMutationOptions = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiUsers>>,
    TError,
    { data: PostApiUsersBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiUsers>>,
  TError,
  { data: PostApiUsersBody },
  TContext
> => {
  const mutationKey = ["postApiUsers"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiUsers>>,
    { data: PostApiUsersBody }
  > = (props) => {
    const { data } = props ?? {};

    return postApiUsers(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiUsersMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiUsers>>
>;
export type PostApiUsersMutationBody = PostApiUsersBody;
export type PostApiUsersMutationError = AxiosError<void>;

/**
 * @summary Create a new user
 */
export const usePostApiUsers = <
  TError = AxiosError<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiUsers>>,
    TError,
    { data: PostApiUsersBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiUsers>>,
  TError,
  { data: PostApiUsersBody },
  TContext
> => {
  const mutationOptions = getPostApiUsersMutationOptions(options);

  return useMutation(mutationOptions);
};
