/* eslint-disable */
import type { Prisma, Post } from '@prisma/client';
// import { getContext } from 'svelte';
import { inject } from 'vue';
import type { MutationOptions, QueryOptions } from '@tanstack/vue-query';
import {
    SvelteQueryContextKey,
    type RequestHandlerContext,
    DEFAULT_QUERY_ENDPOINT,
    FetchFn,
} from './_helper';
import { query, postMutation, putMutation, deleteMutation } from './_helper';

export function useCreatePost(
    options?: Omit<
        MutationOptions<Post, unknown, Prisma.PostCreateArgs>,
        'mutationFn'
    >,
    invalidateQueries: boolean = true
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;

    const _mutation = postMutation<Prisma.PostCreateArgs, Post>(
        'Post',
        `${endpoint}/post/create`,
        options,
        fetch,
        invalidateQueries
    );
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.PostCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.PostCreateArgs>,
            options?: Omit<
                MutationOptions<
                    Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.PostCreateArgs>
                >,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>;
        },
    };
    return mutation;
}

export function useFindManyPost<T extends Prisma.PostFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.PostFindManyArgs>,
    options?: QueryOptions<Array<Prisma.PostGetPayload<T>>>
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    console.log('Calling: findManyPost');
    return query<Array<Prisma.PostGetPayload<T>>>(
        'Post',
        `${endpoint}/post/findMany`,
        args,
        options,
        fetch
    );
}

export function useFindUniquePost<T extends Prisma.PostFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostFindUniqueArgs>,
    options?: QueryOptions<Prisma.PostGetPayload<T>>
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    return query<Prisma.PostGetPayload<T>>(
        'Post',
        `${endpoint}/post/findUnique`,
        args,
        options,
        fetch
    );
}

export function useFindFirstPost<T extends Prisma.PostFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.PostFindFirstArgs>,
    options?: QueryOptions<Prisma.PostGetPayload<T>>
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    return query<Prisma.PostGetPayload<T>>(
        'Post',
        `${endpoint}/post/findFirst`,
        args,
        options,
        fetch
    );
}

export function useUpdatePost(
    options?: Omit<
        MutationOptions<Post, unknown, Prisma.PostUpdateArgs>,
        'mutationFn'
    >,
    invalidateQueries: boolean = true
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    const _mutation = putMutation<Prisma.PostUpdateArgs, Post>(
        'Post',
        `${endpoint}/post/update`,
        options,
        fetch,
        invalidateQueries
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.PostUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.PostUpdateArgs>,
            options?: Omit<
                MutationOptions<
                    Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.PostUpdateArgs>
                >,
                'mutationFn'
            >
        ) {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>;
        },
    };
    return mutation;
}

export function useUpdateManyPost(
    options?: Omit<
        MutationOptions<
            Prisma.BatchPayload,
            unknown,
            Prisma.PostUpdateManyArgs
        >,
        'mutationFn'
    >,
    invalidateQueries: boolean = true
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    const _mutation = putMutation<
        Prisma.PostUpdateManyArgs,
        Prisma.BatchPayload
    >('Post', `${endpoint}/post/updateMany`, options, fetch, invalidateQueries);
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.PostUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.PostUpdateManyArgs>,
            options?: Omit<
                MutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.PostUpdateManyArgs>
                >,
                'mutationFn'
            >
        ) {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertPost(
    options?: Omit<
        MutationOptions<Post, unknown, Prisma.PostUpsertArgs>,
        'mutationFn'
    >,
    invalidateQueries: boolean = true
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    const _mutation = postMutation<Prisma.PostUpsertArgs, Post>(
        'Post',
        `${endpoint}/post/upsert`,
        options,
        fetch,
        invalidateQueries
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.PostUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.PostUpsertArgs>,
            options?: Omit<
                MutationOptions<
                    Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.PostUpsertArgs>
                >,
                'mutationFn'
            >
        ) {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>;
        },
    };
    return mutation;
}

export function useDeletePost(
    options?: Omit<
        MutationOptions<Post, unknown, Prisma.PostDeleteArgs>,
        'mutationFn'
    >,
    invalidateQueries: boolean = true
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    const _mutation = deleteMutation<Prisma.PostDeleteArgs, Post>(
        'Post',
        `${endpoint}/post/delete`,
        options,
        fetch,
        invalidateQueries
    );
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.PostDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.PostDeleteArgs>,
            options?: Omit<
                MutationOptions<
                    Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.PostDeleteArgs>
                >,
                'mutationFn'
            >
        ) {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.CheckSelect<T, Post, Prisma.PostGetPayload<T>>;
        },
    };
    return mutation;
}

export function useDeleteManyPost(
    options?: Omit<
        MutationOptions<
            Prisma.BatchPayload,
            unknown,
            Prisma.PostDeleteManyArgs
        >,
        'mutationFn'
    >,
    invalidateQueries: boolean = true
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    const _mutation = deleteMutation<
        Prisma.PostDeleteManyArgs,
        Prisma.BatchPayload
    >('Post', `${endpoint}/post/deleteMany`, options, fetch, invalidateQueries);
    const mutation = {
        ..._mutation,
        async mutateAsync<T extends Prisma.PostDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.PostDeleteManyArgs>,
            options?: Omit<
                MutationOptions<
                    Prisma.BatchPayload,
                    unknown,
                    Prisma.SelectSubset<T, Prisma.PostDeleteManyArgs>
                >,
                'mutationFn'
            >
        ) {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregatePost<T extends Prisma.PostAggregateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PostAggregateArgs>,
    options?: QueryOptions<Prisma.GetPostAggregateType<T>>
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    return query<Prisma.GetPostAggregateType<T>>(
        'Post',
        `${endpoint}/post/aggregate`,
        args,
        options,
        fetch
    );
}

export function useGroupByPost<
    T extends Prisma.PostGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<T>>,
        Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.PostGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.PostGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<
        Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>
    >,
    ByFields extends Prisma.TupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
              [P in HavingFields]: P extends ByFields
                  ? never
                  : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                        Error,
                        'Field ',
                        P,
                        ` in "having" needs to be provided in "by"`
                    ];
          }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
              [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
>(
    args: Prisma.SelectSubset<
        T,
        Prisma.SubsetIntersection<T, Prisma.PostGroupByArgs, OrderByArg> &
            InputErrors
    >,
    options?: QueryOptions<
        {} extends InputErrors
            ? Array<
                  Prisma.PickArray<Prisma.PostGroupByOutputType, T['by']> & {
                      [P in keyof T &
                          keyof Prisma.PostGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<
                                    T[P],
                                    Prisma.PostGroupByOutputType[P]
                                >
                          : Prisma.GetScalarType<
                                T[P],
                                Prisma.PostGroupByOutputType[P]
                            >;
                  }
              >
            : InputErrors
    >
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    return query<
        {} extends InputErrors
            ? Array<
                  Prisma.PickArray<Prisma.PostGroupByOutputType, T['by']> & {
                      [P in keyof T &
                          keyof Prisma.PostGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<
                                    T[P],
                                    Prisma.PostGroupByOutputType[P]
                                >
                          : Prisma.GetScalarType<
                                T[P],
                                Prisma.PostGroupByOutputType[P]
                            >;
                  }
              >
            : InputErrors
    >('Post', `${endpoint}/post/groupBy`, args, options, fetch);
}

export function useCountPost<T extends Prisma.PostCountArgs>(
    args?: Prisma.SelectSubset<T, Prisma.PostCountArgs>,
    options?: QueryOptions<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<
                      T['select'],
                      Prisma.PostCountAggregateOutputType
                  >
            : number
    >
) {
    const context = inject<RequestHandlerContext>(SvelteQueryContextKey);
    const endpoint = context?.endpoint ?? DEFAULT_QUERY_ENDPOINT;
    const fetch = context?.fetch;
    return query<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<
                      T['select'],
                      Prisma.PostCountAggregateOutputType
                  >
            : number
    >('Post', `${endpoint}/post/count`, args, options, fetch);
}
