const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const schema = require("../graphql")

const startGraphQlServer = async (app) => {
    try {
        const apolloServer = new ApolloServer({
            schema,
            context: ({ req }) => ({
                headers: req.headers,
                user: req.user,
            }),
            introspection: true,
            playground: true,
        });
        await apolloServer.start();
        app.use('/graphql', expressMiddleware(apolloServer));
    } catch (err) {
        console.log(err)
    }

};

module.exports = { startGraphQlServer };
