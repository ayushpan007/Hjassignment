const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require("../controller/blogs")
const { upload } = require("../utils/utils"); 
module.exports = (router) => {
    router.post('/blogs',upload.single("image") ,createBlog);
    router.get("/blogs", getBlogs);
    router.get("/blogs/:id", getBlogById);
    router.put("/blogs/:id",upload.single("image"),updateBlog);
    router.delete("/blogs/:id", deleteBlog);
};