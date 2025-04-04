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
  GetApiWorkspacesParams,
  PatchApiWorkspacesWorkspaceIdBody,
  PostApiWorkspacesBody,
  Workspace,
} from ".././model";

/**
 * @summary Update a workspace
 */
export type patchApiWorkspacesWorkspaceIdResponse200 = {
  data: Workspace;
  status: 200;
};

export type patchApiWorkspacesWorkspaceIdResponse400 = {
  data: void;
  status: 400;
};

export type patchApiWorkspacesWorkspaceIdResponseComposite =
  | patchApiWorkspacesWorkspaceIdResponse200
  | patchApiWorkspacesWorkspaceIdResponse400;

export type patchApiWorkspacesWorkspaceIdResponse =
  patchApiWorkspacesWorkspaceIdResponseComposite & {
    headers: Headers;
  };

export const getPatchApiWorkspacesWorkspaceIdUrl = (workspaceId: string) => {
  return `http://localhost:5173/api/workspaces/${workspaceId}`;
};

export const patchApiWorkspacesWorkspaceId = async (
  workspaceId: string,
  patchApiWorkspacesWorkspaceIdBody: PatchApiWorkspacesWorkspaceIdBody,
  options?: RequestInit,
): Promise<patchApiWorkspacesWorkspaceIdResponse> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append(
    "data",
    JSON.stringify(patchApiWorkspacesWorkspaceIdBody.data),
  );

  const res = await fetch(getPatchApiWorkspacesWorkspaceIdUrl(workspaceId), {
    ...options,
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...options?.headers,
    },
    body: formUrlEncoded,
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: patchApiWorkspacesWorkspaceIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as patchApiWorkspacesWorkspaceIdResponse;
};

export const getPatchApiWorkspacesWorkspaceIdMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiWorkspacesWorkspaceId>>,
    TError,
    { workspaceId: string; data: PatchApiWorkspacesWorkspaceIdBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchApiWorkspacesWorkspaceId>>,
  TError,
  { workspaceId: string; data: PatchApiWorkspacesWorkspaceIdBody },
  TContext
> => {
  const mutationKey = ["patchApiWorkspacesWorkspaceId"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchApiWorkspacesWorkspaceId>>,
    { workspaceId: string; data: PatchApiWorkspacesWorkspaceIdBody }
  > = (props) => {
    const { workspaceId, data } = props ?? {};

    return patchApiWorkspacesWorkspaceId(workspaceId, data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PatchApiWorkspacesWorkspaceIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchApiWorkspacesWorkspaceId>>
>;
export type PatchApiWorkspacesWorkspaceIdMutationBody =
  PatchApiWorkspacesWorkspaceIdBody;
export type PatchApiWorkspacesWorkspaceIdMutationError = void;

/**
 * @summary Update a workspace
 */
export const usePatchApiWorkspacesWorkspaceId = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchApiWorkspacesWorkspaceId>>,
    TError,
    { workspaceId: string; data: PatchApiWorkspacesWorkspaceIdBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchApiWorkspacesWorkspaceId>>,
  TError,
  { workspaceId: string; data: PatchApiWorkspacesWorkspaceIdBody },
  TContext
> => {
  const mutationOptions =
    getPatchApiWorkspacesWorkspaceIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Delete a workspace
 */
export type deleteApiWorkspacesWorkspaceIdResponse200 = {
  data: Workspace;
  status: 200;
};

export type deleteApiWorkspacesWorkspaceIdResponse400 = {
  data: void;
  status: 400;
};

export type deleteApiWorkspacesWorkspaceIdResponseComposite =
  | deleteApiWorkspacesWorkspaceIdResponse200
  | deleteApiWorkspacesWorkspaceIdResponse400;

export type deleteApiWorkspacesWorkspaceIdResponse =
  deleteApiWorkspacesWorkspaceIdResponseComposite & {
    headers: Headers;
  };

export const getDeleteApiWorkspacesWorkspaceIdUrl = (workspaceId: string) => {
  return `http://localhost:5173/api/workspaces/${workspaceId}`;
};

export const deleteApiWorkspacesWorkspaceId = async (
  workspaceId: string,
  options?: RequestInit,
): Promise<deleteApiWorkspacesWorkspaceIdResponse> => {
  const res = await fetch(getDeleteApiWorkspacesWorkspaceIdUrl(workspaceId), {
    ...options,
    method: "DELETE",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: deleteApiWorkspacesWorkspaceIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as deleteApiWorkspacesWorkspaceIdResponse;
};

export const getDeleteApiWorkspacesWorkspaceIdMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiWorkspacesWorkspaceId>>,
    TError,
    { workspaceId: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiWorkspacesWorkspaceId>>,
  TError,
  { workspaceId: string },
  TContext
> => {
  const mutationKey = ["deleteApiWorkspacesWorkspaceId"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiWorkspacesWorkspaceId>>,
    { workspaceId: string }
  > = (props) => {
    const { workspaceId } = props ?? {};

    return deleteApiWorkspacesWorkspaceId(workspaceId, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiWorkspacesWorkspaceIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiWorkspacesWorkspaceId>>
>;

export type DeleteApiWorkspacesWorkspaceIdMutationError = void;

/**
 * @summary Delete a workspace
 */
export const useDeleteApiWorkspacesWorkspaceId = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiWorkspacesWorkspaceId>>,
    TError,
    { workspaceId: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiWorkspacesWorkspaceId>>,
  TError,
  { workspaceId: string },
  TContext
> => {
  const mutationOptions =
    getDeleteApiWorkspacesWorkspaceIdMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Returns a list of workspaces, optionally filtered by tenantId
 * @summary Get all workspaces
 */
export type getApiWorkspacesResponse200 = {
  data: Workspace[];
  status: 200;
};

export type getApiWorkspacesResponseComposite = getApiWorkspacesResponse200;

export type getApiWorkspacesResponse = getApiWorkspacesResponseComposite & {
  headers: Headers;
};

export const getGetApiWorkspacesUrl = (params?: GetApiWorkspacesParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `http://localhost:5173/api/workspaces?${stringifiedParams}`
    : `http://localhost:5173/api/workspaces`;
};

export const getApiWorkspaces = async (
  params?: GetApiWorkspacesParams,
  options?: RequestInit,
): Promise<getApiWorkspacesResponse> => {
  const res = await fetch(getGetApiWorkspacesUrl(params), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getApiWorkspacesResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getApiWorkspacesResponse;
};

export const getGetApiWorkspacesQueryKey = (
  params?: GetApiWorkspacesParams,
) => {
  return [
    `http://localhost:5173/api/workspaces`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiWorkspacesQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiWorkspaces>>,
  TError = unknown,
>(
  params?: GetApiWorkspacesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiWorkspaces>>,
        TError,
        TData
      >
    >;
    fetch?: RequestInit;
  },
) => {
  const { query: queryOptions, fetch: fetchOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiWorkspacesQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiWorkspaces>>
  > = ({ signal }) => getApiWorkspaces(params, { signal, ...fetchOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiWorkspaces>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiWorkspacesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiWorkspaces>>
>;
export type GetApiWorkspacesQueryError = unknown;

export function useGetApiWorkspaces<
  TData = Awaited<ReturnType<typeof getApiWorkspaces>>,
  TError = unknown,
>(
  params: undefined | GetApiWorkspacesParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiWorkspaces>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiWorkspaces>>,
          TError,
          Awaited<ReturnType<typeof getApiWorkspaces>>
        >,
        "initialData"
      >;
    fetch?: RequestInit;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiWorkspaces<
  TData = Awaited<ReturnType<typeof getApiWorkspaces>>,
  TError = unknown,
>(
  params?: GetApiWorkspacesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiWorkspaces>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiWorkspaces>>,
          TError,
          Awaited<ReturnType<typeof getApiWorkspaces>>
        >,
        "initialData"
      >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiWorkspaces<
  TData = Awaited<ReturnType<typeof getApiWorkspaces>>,
  TError = unknown,
>(
  params?: GetApiWorkspacesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiWorkspaces>>,
        TError,
        TData
      >
    >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Get all workspaces
 */

export function useGetApiWorkspaces<
  TData = Awaited<ReturnType<typeof getApiWorkspaces>>,
  TError = unknown,
>(
  params?: GetApiWorkspacesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiWorkspaces>>,
        TError,
        TData
      >
    >;
    fetch?: RequestInit;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiWorkspacesQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Get all workspaces
 */
export const prefetchGetApiWorkspaces = async <
  TData = Awaited<ReturnType<typeof getApiWorkspaces>>,
  TError = unknown,
>(
  queryClient: QueryClient,
  params?: GetApiWorkspacesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiWorkspaces>>,
        TError,
        TData
      >
    >;
    fetch?: RequestInit;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetApiWorkspacesQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * @summary Create a new workspace
 */
export type postApiWorkspacesResponse200 = {
  data: Workspace;
  status: 200;
};

export type postApiWorkspacesResponse400 = {
  data: void;
  status: 400;
};

export type postApiWorkspacesResponseComposite =
  | postApiWorkspacesResponse200
  | postApiWorkspacesResponse400;

export type postApiWorkspacesResponse = postApiWorkspacesResponseComposite & {
  headers: Headers;
};

export const getPostApiWorkspacesUrl = () => {
  return `http://localhost:5173/api/workspaces`;
};

export const postApiWorkspaces = async (
  postApiWorkspacesBody: PostApiWorkspacesBody,
  options?: RequestInit,
): Promise<postApiWorkspacesResponse> => {
  const formUrlEncoded = new URLSearchParams();
  formUrlEncoded.append("name", postApiWorkspacesBody.name);
  formUrlEncoded.append("tenantId", postApiWorkspacesBody.tenantId);

  const res = await fetch(getPostApiWorkspacesUrl(), {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...options?.headers,
    },
    body: formUrlEncoded,
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postApiWorkspacesResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postApiWorkspacesResponse;
};

export const getPostApiWorkspacesMutationOptions = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiWorkspaces>>,
    TError,
    { data: PostApiWorkspacesBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiWorkspaces>>,
  TError,
  { data: PostApiWorkspacesBody },
  TContext
> => {
  const mutationKey = ["postApiWorkspaces"];
  const { mutation: mutationOptions, fetch: fetchOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, fetch: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiWorkspaces>>,
    { data: PostApiWorkspacesBody }
  > = (props) => {
    const { data } = props ?? {};

    return postApiWorkspaces(data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiWorkspacesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiWorkspaces>>
>;
export type PostApiWorkspacesMutationBody = PostApiWorkspacesBody;
export type PostApiWorkspacesMutationError = void;

/**
 * @summary Create a new workspace
 */
export const usePostApiWorkspaces = <
  TError = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiWorkspaces>>,
    TError,
    { data: PostApiWorkspacesBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiWorkspaces>>,
  TError,
  { data: PostApiWorkspacesBody },
  TContext
> => {
  const mutationOptions = getPostApiWorkspacesMutationOptions(options);

  return useMutation(mutationOptions);
};
