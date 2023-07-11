/* eslint-disable prettier/prettier */
/**
 * The default query endpoint.
 */
export const DEFAULT_QUERY_ENDPOINT = '/api/model';

/**
 * Prefix for react-query keys.
 */
export const QUERY_KEY_PREFIX = 'zenstack:';

/**
 * Function signature for `fetch`.
 */
export type FetchFn = (url: string, options?: RequestInit) => Promise<Response>;

/**
 * Context type for configuring the hooks.
 */
export type RequestHandlerContext = {
    /**
     * The endpoint to use for the queries.
     */
    endpoint: string;

    /**
     * A custom fetch function for sending the HTTP requests.
     */
    fetch?: FetchFn;
};

async function fetcher<R>(url: string, options?: RequestInit, fetch?: FetchFn) {
    const _fetch =
        fetch ?? (typeof window !== 'undefined' ? window.fetch : global.fetch);
    const res = await _fetch(url, options as any);
    if (!res.ok) {
        const error: Error & { info?: unknown; status?: number } = new Error(
            'An error occurred while fetching the data.'
        );
        error.info = unmarshal(await res.text());
        error.status = res.status;
        throw error;
    }

    const textResult = await res.text();
    try {
        return unmarshal(textResult) as R;
    } catch (err) {
        console.error(`Unable to deserialize data:`, textResult);
        throw err;
    }
}

/* eslint-disable */

import {
    useMutation,
    useQuery,
    useQueryClient,
    type MutateFunction,
    type QueryClient,
    type QueryOptions,
} from '@tanstack/vue-query';
import { VueMutationObserverOptions } from '@tanstack/vue-query/build/lib/useMutation';

/**
 * Key for setting and getting the global query context.
 */
export const SvelteQueryContextKey = 'zenstack-svelte-query-context';

/**
 * Creates a svelte-query query.
 *
 * @param model The name of the model under query.
 * @param url The request URL.
 * @param args The request args object, URL-encoded and appended as "?q=" parameter
 * @param options The svelte-query options object
 * @returns useQuery hook
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function query<R>(
    model: string,
    url: string,
    args?: unknown,
    options?: QueryOptions<R>,
    fetch?: FetchFn
) {
    const reqUrl = makeUrl(url, args);
    return useQuery<R>({
        queryKey: [QUERY_KEY_PREFIX + model, url, args],
        queryFn: () => fetcher<R>(reqUrl, undefined, fetch),
        ...options,
    });
}

/**
 * Creates a POST mutation with svelte-query.
 *
 * @param model The name of the model under mutation.
 * @param url The request URL.
 * @param options The svelte-query options.
 * @param invalidateQueries Whether to invalidate queries after mutation.
 * @returns useMutation hooks
 */
export function postMutation<T, R = any>(
    model: string,
    url: string,
    options?: Omit<VueMutationObserverOptions<R, unknown, T>, 'mutationFn'>,
    fetch?: FetchFn,
    invalidateQueries = true
) {
    const queryClient = useQueryClient();
    const mutationFn = (data: any) =>
        fetcher<R>(
            url,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: marshal(data),
            },
            fetch
        );

    const finalOptions = mergeOptions<T, R>(
        model,
        options,
        invalidateQueries,
        mutationFn,
        queryClient
    );
    const mutation = useMutation<R, unknown, T>(finalOptions);
    return mutation;
}

/**
 * Creates a PUT mutation with svelte-query.
 *
 * @param model The name of the model under mutation.
 * @param url The request URL.
 * @param options The svelte-query options.
 * @param invalidateQueries Whether to invalidate queries after mutation.
 * @returns useMutation hooks
 */
export function putMutation<T, R = any>(
    model: string,
    url: string,
    options?: Omit<VueMutationObserverOptions<R, unknown, T>, 'mutationFn'>,
    fetch?: FetchFn,
    invalidateQueries = true
) {
    const queryClient = useQueryClient();
    const mutationFn = (data: any) =>
        fetcher<R>(
            url,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: marshal(data),
            },
            fetch
        );

    const finalOptions = mergeOptions<T, R>(
        model,
        options,
        invalidateQueries,
        mutationFn,
        queryClient
    );
    const mutation = useMutation<R, unknown, T>(finalOptions);
    return mutation;
}

/**
 * Creates a DELETE mutation with svelte-query.
 *
 * @param model The name of the model under mutation.
 * @param url The request URL.
 * @param options The svelte-query options.
 * @param invalidateQueries Whether to invalidate queries after mutation.
 * @returns useMutation hooks
 */
export function deleteMutation<T, R = any>(
    model: string,
    url: string,
    options?: Omit<VueMutationObserverOptions<R, unknown, T>, 'mutationFn'>,
    fetch?: FetchFn,
    invalidateQueries = true
) {
    const queryClient = useQueryClient();
    const mutationFn = (data: any) =>
        fetcher<R>(
            makeUrl(url, data),
            {
                method: 'DELETE',
            },
            fetch
        );

    const finalOptions = mergeOptions<T, R>(
        model,
        options,
        invalidateQueries,
        mutationFn,
        queryClient
    );
    const mutation = useMutation<R, unknown, T>(finalOptions);
    return mutation;
}

function mergeOptions<T, R = any>(
    model: string,
    options:
        | Omit<VueMutationObserverOptions<R, unknown, T, unknown>, 'mutationFn'>
        | undefined,
    invalidateQueries: boolean,
    mutationFn: MutateFunction<R, unknown, T>,
    queryClient: QueryClient
): VueMutationObserverOptions<R, unknown, T, unknown> {
    const result = { ...options, mutationFn };
    if (options?.onSuccess || invalidateQueries) {
        result.onSuccess = (...args) => {
            if (invalidateQueries) {
                queryClient.invalidateQueries([QUERY_KEY_PREFIX + model]);
            }
            const onSuccess = options?.onSuccess as Function;
            return onSuccess?.(...args);
        };
    }
    return result;
}

function marshal(value: unknown) {
    return JSON.stringify(value);
}

function unmarshal(value: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse(value) as any;
}

function makeUrl(url: string, args: unknown) {
    return args ? url + `?q=${encodeURIComponent(JSON.stringify(args))}` : url;
}
