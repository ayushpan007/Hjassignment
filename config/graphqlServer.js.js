// server.js
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const typeDefs=require("../graphql/schema/blog")
const resolvers=require("../graphql/resolver/blog")
const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
  try {
    if (!token) throw new Error('No token provided');
    
    const tokenString = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};


const startGraphQlServer = async (app) => {
    try {
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            formatError: (error) => {
                console.log('GraphQL Error:', error);
                return error;
            },
        });

        await apolloServer.start();

        app.use(
            '/graphql',
            express.json(),
            expressMiddleware(apolloServer, {
                context: async ({ req }) => {
                    // Get the authorization header
                    const authorization = req.headers.authorization;
                    
                    if (!authorization) {
                        return { user: null };
                    }

                    try {
                        const user = await verifyToken(authorization);
                        return { user };
                    } catch (error) {
                        return { user: null };
                    }
                }
            })
        );

        console.log('GraphQL server started successfully');
    } catch (err) {
        console.error('Error starting GraphQL server:', err);
    }
};

module.exports = { startGraphQlServer };