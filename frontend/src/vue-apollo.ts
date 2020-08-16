import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { queue } from '@/queue';

const httpEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/graphql` || 'http://localhost:4000/graphql';

// const link = onError(error => {
//   if (error.graphQLErrors[0].message === "PermissionDenied") {
//     queue.notify("graphqlError");
//   }
// });

export const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: httpEndpoint,
  onError(error) {
    if (
      error.graphQLErrors !== undefined &&
      error.graphQLErrors[0].message === 'Forbidden resource'
    ) {
      queue.notify('graphqlError');
    }
  },
});

// export const apolloProvider = new VueApollo({
//   defaultClient: apolloClient
// });
