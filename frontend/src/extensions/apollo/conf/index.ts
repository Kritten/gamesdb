import type { ApolloClientOptions } from '@apollo/client/core';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
/* import type { BootFileParams } from '@quasar/app' */

export /* async */ function getClientOptions(/* {app, router, ...}: Partial<BootFileParams<unknown>> */) {
    return <ApolloClientOptions<unknown>>Object.assign(
        // General options.
        <ApolloClientOptions<unknown>>{
            link: createHttpLink({
                uri:
                    `${process.env.GRAPHQL_URI}/graphql` ||
                    // Change to your graphql endpoint.
                    'http://localhost:4000/graphql',
            }),

            cache: new InMemoryCache({}),

            defaultOptions: {
                query: { fetchPolicy: 'no-cache' },
                mutate: { fetchPolicy: 'no-cache' },
                watchQuery: { fetchPolicy: 'no-cache' },
            },
        },

        // Specific Quasar mode options.
        process.env.MODE === 'spa'
            ? {
                  //
              }
            : {},
        process.env.MODE === 'ssr'
            ? {
                  //
              }
            : {},
        process.env.MODE === 'pwa'
            ? {
                  //
              }
            : {},
        process.env.MODE === 'bex'
            ? {
                  //
              }
            : {},
        process.env.MODE === 'cordova'
            ? {
                  //
              }
            : {},
        process.env.MODE === 'capacitor'
            ? {
                  //
              }
            : {},
        process.env.MODE === 'electron'
            ? {
                  //
              }
            : {},

        // dev/prod options.
        process.env.DEV
            ? {
                  //
              }
            : {},
        process.env.PROD
            ? {
                  //
              }
            : {},

        // For ssr mode, when on server.
        process.env.MODE === 'ssr' && process.env.SERVER
            ? {
                  ssrMode: true,
              }
            : {},
        // For ssr mode, when on client.
        process.env.MODE === 'ssr' && process.env.CLIENT
            ? {
                  ssrForceFetchDelay: 100,
              }
            : {}
    );
}
