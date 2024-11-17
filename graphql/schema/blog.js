module.exports = `
    type Blog {
        id: ID!
        title: String!
        description: String!
        content: String!
        image: String
        author: ID!
    }

    type Query {
        getBlogs: [Blog!]!
        getBlogById(id: ID!): Blog
    }

    type Mutation {
        createBlog(title: String!, description: String!, content: String!, author: ID!): Blog!
        updateBlog(id: ID!, title: String, description: String, content: String, image: String): Blog!
        deleteBlog(id: ID!): String!
    }
`
