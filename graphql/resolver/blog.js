const Blog = require("../../models/blogModel");
const path = require("path");
const fs = require("fs");

const getBlogs = async (_, args, context) => {
    try {
      const { user: { userId }, headers: { authorization } } = context;
  
      if (!authorization) {
        throw new Error("Unauthorized access.");
      }
      const blogs = await Blog.find();
      if (!blogs) {
        throw new Error("No blogs found.");
      }
      return blogs;
    } catch (err) {
      console.error(err);
      throw new Error("Internal server error.");
    }
  };
  



module.exports = {
  Query: {
    getBlogs,
  },
};
