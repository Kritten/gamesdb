import { ApolloClient /* , createHttpLink */ } from '@apollo/client/core';
import { boot } from 'quasar/wrappers';
/* import type { BootFileParams } from '@quasar/app' */
import { DocumentNode } from 'graphql';
import { getClientOptions } from '@/extensions/apollo/conf';

let apolloClients: Record<string, ApolloClient<unknown>>;

export default boot(
    /* async */ (/* {app, router, ...}: BootFileParams<unknown> */) => {
        // Default client.
        const options = /* await */ getClientOptions(/* {app, router ...} */);
        const apolloClient = new ApolloClient(options);

        // // Additional client `clientA`
        // const optionsA = { ...options }
        // // Modify options as needed.
        // optionsA.link = createHttpLink({ uri: 'http://clientA.example.com' })
        // const clientA = new ApolloClient(optionsA)

        // // Additional client `clientB`
        // const optionsB = { ...options }
        // // Modify options as needed.
        // optionsB.link = createHttpLink({ uri: 'http://clientB.example.com' })
        // const clientB = new ApolloClient(optionsB)

        apolloClients = {
            default: apolloClient,
            // clientA,
            // clientB,
        };
    }
);

export const query = async <T>(
    queryPassed: DocumentNode,
    variables?: Record<string, unknown>
): Promise<T> => {
    const response = await apolloClients.default.query({
        query: queryPassed,
        variables,
    });

    return response.data as unknown as T;
    // TODO: Replace when apollo is updated
    // const { onResult } = useQuery(queryPassed, variables === undefined ? {} : variables);
    // console.warn(onResult, 'onResult');
    // resolve({} as T);
    // onResult((response) => {
    //   console.warn(response, 'response');
    //   resolve(response.data as unknown as T);
    // });
};

export const mutate = async <T>(
    mutationPassed: DocumentNode,
    variables?: Record<string, unknown>
): Promise<T> => {
    const response = await apolloClients.default.mutate({
        mutation: mutationPassed,
        variables,
    });

    return response.data as unknown as T;
};
