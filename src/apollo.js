import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { withClientState } from "apollo-link-state";
import { typeDefs, resolvers, defaults } from "./clientState";

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  typeDefs,
  resolvers,
  defaults,
});

const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link: ApolloLink.from([stateLink]),
});

export default client;
