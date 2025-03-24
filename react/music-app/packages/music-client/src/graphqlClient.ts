import { GraphQLClient } from "graphql-request";

// endpoint
const endpoint = import.meta.env.VITE_API_HOST;

export const graphqlClient = new GraphQLClient(endpoint);