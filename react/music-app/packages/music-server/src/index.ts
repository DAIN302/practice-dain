import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port:4000}).then(({url}) => {
    console.log(`Server ready at ${url}`);  
})