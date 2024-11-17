const typeDefs = `
    type Blog {
        _id: ID!
        title: String!
        description: String!
        content: String!
        image: String
        author: ID!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getBlogs: [Blog]
        getBlogById(id: ID!): Blog
    }

    type Mutation {
        createBlog(
            title: String!, 
            description: String!, 
            content: String!,
            author: ID!,
            image: String
        ): Blog!
        
        updateBlog(
            id: ID!, 
            title: String, 
            description: String, 
            content: String, 
            image: String
        ): Blog!
        
        deleteBlog(id: ID!): String!
    }
`;

module.exports = typeDefs;