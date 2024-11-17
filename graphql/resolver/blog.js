const Blog = require("../../models/blogModel");
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        getBlogs: async (_, args, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authentication required");
                }

                const blogs = await Blog.find({});
                return blogs;
            } catch (error) {
                console.error("Error fetching blogs:", error);
                throw error;
            }
        },

        getBlogById: async (_, { id }, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authentication required");
                }

                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid blog ID");
                }

                const blog = await Blog.findById(id);
                if (!blog) {
                    throw new Error("Blog not found");
                }

                return blog;
            } catch (error) {
                console.error("Error fetching blog:", error);
                throw error;
            }
        }
    },

    Mutation: {
        createBlog: async (_, args, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authentication required");
                }

                const { title, description, content, image } = args;
                
                const newBlog = new Blog({
                    title,
                    description,
                    content,
                    author: context.user.id,
                    image: image || null
                });

                const savedBlog = await newBlog.save();
                return savedBlog;
            } catch (error) {
                console.error("Error creating blog:", error);
                throw error;
            }
        },
        updateBlog: async (_, args, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authentication required");
                }
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid blog ID");
                }
                const { id, title, description, content, image }=args
                const updateData = {};
                if (title) updateData.title = title;
                if (description) updateData.description = description;
                if (content) updateData.content = content;
                if (image !== undefined) updateData.image = image;

                const updatedBlog = await Blog.findByIdAndUpdate(
                    id,
                    { $set: updateData },
                    { new: true, runValidators: true }
                );

                if (!updatedBlog) {
                    throw new Error("Blog not found");
                }

                return updatedBlog;
            } catch (error) {
                console.error("Error updating blog:", error);
                throw error;
            }
        },

        deleteBlog: async (_, { id },context) => {
            try {
                if (!context.user) {
                    throw new Error("Authentication required");
                }
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid blog ID");
                }

                const deletedBlog = await Blog.findByIdAndDelete(id);

                if (!deletedBlog) {
                    throw new Error("Blog not found");
                }

                return "Blog deleted successfully";
            } catch (error) {
                console.error("Error deleting blog:", error);
                throw error;
            }
        }
    }
};

module.exports = resolvers;