import { queue } from '@/queue';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

const httpEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/graphql` || 'http://localhost:4000/graphql';

// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: httpEndpoint,
// });

const link = onError(({ graphQLErrors, networkError }) => {
  console.warn(graphQLErrors, 'graphQLErrors');
  console.warn(networkError, 'networkError');
  if (graphQLErrors !== undefined && graphQLErrors[0].message === 'Forbidden resource') {
    queue.notify('graphqlError');
  }
});

export const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  // uri: httpEndpoint,
  cache: new InMemoryCache(),
  link: ApolloLink.from([link, new HttpLink({ uri: httpEndpoint })]),
  defaultOptions: {
    query: { fetchPolicy: 'network-only' },
  },
});

// export const apolloProvider = new VueApollo({
//   defaultClient: apolloClient
// });
