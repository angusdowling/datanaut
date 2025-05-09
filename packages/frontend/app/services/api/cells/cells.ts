/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * backend
 * OpenAPI spec version: 1.0
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
  CellDto,
  CreateCellDto,
  GetCellsParams,
  UpdateCellDto,
} from ".././model";

import { customFetch } from "../../../utilities/api";
import { useCustomMutatorOptions } from "../../../features/api/hooks/useCustomMutatorOptions";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type getCellsResponse200 = {
  data: CellDto[];
  status: 200;
};

export type getCellsResponseComposite = getCellsResponse200;

export type getCellsResponse = getCellsResponseComposite & {
  headers: Headers;
};

export const getGetCellsUrl = (params?: GetCellsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/cells?${stringifiedParams}`
    : `/api/cells`;
};

export const getCells = async (
  params?: GetCellsParams,
  options?: RequestInit,
): Promise<getCellsResponse> => {
  return customFetch<getCellsResponse>(getGetCellsUrl(params), {
    ...options,
    method: "GET",
  });
};

export const getGetCellsQueryKey = (params?: GetCellsParams) => {
  return [`/api/cells`, ...(params ? [params] : [])] as const;
};

export const getGetCellsQueryOptions = <
  TData = Awaited<ReturnType<typeof getCells>>,
  TError = unknown,
>(
  params?: GetCellsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCells>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetCellsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getCells>>> = ({
    signal,
  }) => getCells(params, { signal, ...requestOptions });

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCells>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GetCellsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getCells>>
>;
export type GetCellsQueryError = unknown;

export function useGetCells<
  TData = Awaited<ReturnType<typeof getCells>>,
  TError = unknown,
>(
  params: undefined | GetCellsParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCells>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCells>>,
          TError,
          Awaited<ReturnType<typeof getCells>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customFetch>;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetCells<
  TData = Awaited<ReturnType<typeof getCells>>,
  TError = unknown,
>(
  params?: GetCellsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCells>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCells>>,
          TError,
          Awaited<ReturnType<typeof getCells>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetCells<
  TData = Awaited<ReturnType<typeof getCells>>,
  TError = unknown,
>(
  params?: GetCellsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCells>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};

export function useGetCells<
  TData = Awaited<ReturnType<typeof getCells>>,
  TError = unknown,
>(
  params?: GetCellsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCells>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetCellsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const prefetchGetCells = async <
  TData = Awaited<ReturnType<typeof getCells>>,
  TError = unknown,
>(
  queryClient: QueryClient,
  params?: GetCellsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCells>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetCellsQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

export type postCellsResponse200 = {
  data: CellDto;
  status: 200;
};

export type postCellsResponseComposite = postCellsResponse200;

export type postCellsResponse = postCellsResponseComposite & {
  headers: Headers;
};

export const getPostCellsUrl = () => {
  return `/api/cells`;
};

export const postCells = async (
  createCellDto: CreateCellDto,
  options?: RequestInit,
): Promise<postCellsResponse> => {
  return customFetch<postCellsResponse>(getPostCellsUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(createCellDto),
  });
};

export const usePostCellsMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postCells>>,
    TError,
    { data: CreateCellDto },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postCells>>,
  TError,
  { data: CreateCellDto },
  TContext
> => {
  const mutationKey = ["postCells"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postCells>>,
    { data: CreateCellDto }
  > = (props) => {
    const { data } = props ?? {};

    return postCells(data, requestOptions);
  };

  const customOptions = useCustomMutatorOptions(
    { ...mutationOptions, mutationFn },
    { url: `/api/cells` },
    { operationId: "PostCells", operationName: "postCells" },
  );

  return customOptions;
};

export type PostCellsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postCells>>
>;
export type PostCellsMutationBody = CreateCellDto;
export type PostCellsMutationError = unknown;

export const usePostCells = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postCells>>,
    TError,
    { data: CreateCellDto },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof postCells>>,
  TError,
  { data: CreateCellDto },
  TContext
> => {
  const mutationOptions = usePostCellsMutationOptions(options);

  return useMutation(mutationOptions);
};
export type getCellsIdResponse200 = {
  data: CellDto;
  status: 200;
};

export type getCellsIdResponseComposite = getCellsIdResponse200;

export type getCellsIdResponse = getCellsIdResponseComposite & {
  headers: Headers;
};

export const getGetCellsIdUrl = (id: string) => {
  return `/api/cells/${id}`;
};

export const getCellsId = async (
  id: string,
  options?: RequestInit,
): Promise<getCellsIdResponse> => {
  return customFetch<getCellsIdResponse>(getGetCellsIdUrl(id), {
    ...options,
    method: "GET",
  });
};

export const getGetCellsIdQueryKey = (id: string) => {
  return [`/api/cells/${id}`] as const;
};

export const getGetCellsIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getCellsId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCellsId>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetCellsIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getCellsId>>> = ({
    signal,
  }) => getCellsId(id, { signal, ...requestOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    staleTime: 10000,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCellsId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetCellsIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getCellsId>>
>;
export type GetCellsIdQueryError = unknown;

export function useGetCellsId<
  TData = Awaited<ReturnType<typeof getCellsId>>,
  TError = unknown,
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCellsId>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCellsId>>,
          TError,
          Awaited<ReturnType<typeof getCellsId>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customFetch>;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetCellsId<
  TData = Awaited<ReturnType<typeof getCellsId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCellsId>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCellsId>>,
          TError,
          Awaited<ReturnType<typeof getCellsId>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetCellsId<
  TData = Awaited<ReturnType<typeof getCellsId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCellsId>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};

export function useGetCellsId<
  TData = Awaited<ReturnType<typeof getCellsId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCellsId>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetCellsIdQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const prefetchGetCellsId = async <
  TData = Awaited<ReturnType<typeof getCellsId>>,
  TError = unknown,
>(
  queryClient: QueryClient,
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getCellsId>>, TError, TData>
    >;
    request?: SecondParameter<typeof customFetch>;
  },
): Promise<QueryClient> => {
  const queryOptions = getGetCellsIdQueryOptions(id, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

export type patchCellsIdResponse200 = {
  data: CellDto;
  status: 200;
};

export type patchCellsIdResponseComposite = patchCellsIdResponse200;

export type patchCellsIdResponse = patchCellsIdResponseComposite & {
  headers: Headers;
};

export const getPatchCellsIdUrl = (id: string) => {
  return `/api/cells/${id}`;
};

export const patchCellsId = async (
  id: string,
  updateCellDto: UpdateCellDto,
  options?: RequestInit,
): Promise<patchCellsIdResponse> => {
  return customFetch<patchCellsIdResponse>(getPatchCellsIdUrl(id), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(updateCellDto),
  });
};

export const usePatchCellsIdMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchCellsId>>,
    TError,
    { id: string; data: UpdateCellDto },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof patchCellsId>>,
  TError,
  { id: string; data: UpdateCellDto },
  TContext
> => {
  const mutationKey = ["patchCellsId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchCellsId>>,
    { id: string; data: UpdateCellDto }
  > = (props) => {
    const { id, data } = props ?? {};

    return patchCellsId(id, data, requestOptions);
  };

  const customOptions = useCustomMutatorOptions(
    { ...mutationOptions, mutationFn },
    { url: `/api/cells/{id}` },
    { operationId: "PatchCellsId", operationName: "patchCellsId" },
  );

  return customOptions;
};

export type PatchCellsIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchCellsId>>
>;
export type PatchCellsIdMutationBody = UpdateCellDto;
export type PatchCellsIdMutationError = unknown;

export const usePatchCellsId = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchCellsId>>,
    TError,
    { id: string; data: UpdateCellDto },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof patchCellsId>>,
  TError,
  { id: string; data: UpdateCellDto },
  TContext
> => {
  const mutationOptions = usePatchCellsIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export type deleteCellsIdResponse200 = {
  data: void;
  status: 200;
};

export type deleteCellsIdResponseComposite = deleteCellsIdResponse200;

export type deleteCellsIdResponse = deleteCellsIdResponseComposite & {
  headers: Headers;
};

export const getDeleteCellsIdUrl = (id: string) => {
  return `/api/cells/${id}`;
};

export const deleteCellsId = async (
  id: string,
  options?: RequestInit,
): Promise<deleteCellsIdResponse> => {
  return customFetch<deleteCellsIdResponse>(getDeleteCellsIdUrl(id), {
    ...options,
    method: "DELETE",
  });
};

export const useDeleteCellsIdMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteCellsId>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteCellsId>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationKey = ["deleteCellsId"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteCellsId>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return deleteCellsId(id, requestOptions);
  };

  const customOptions = useCustomMutatorOptions(
    { ...mutationOptions, mutationFn },
    { url: `/api/cells/{id}` },
    { operationId: "DeleteCellsId", operationName: "deleteCellsId" },
  );

  return customOptions;
};

export type DeleteCellsIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteCellsId>>
>;

export type DeleteCellsIdMutationError = unknown;

export const useDeleteCellsId = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteCellsId>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customFetch>;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteCellsId>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationOptions = useDeleteCellsIdMutationOptions(options);

  return useMutation(mutationOptions);
};
