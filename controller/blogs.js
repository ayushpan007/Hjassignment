const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const author = req.userId;
    const image = req.file ? req.file.path : null;
    
    const newBlog = await Blog.create({
      title,
      description,
      content,
      image,
      author,
    });
    res.status(201).json({
      message: "Blog created successfully.",
      data: newBlog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.status(200).json({
      message: "Blogs retrieved successfully.",
      data: blogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json({
      message: "Blog retrieved successfully.",
      data: blog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      if (req.file) {
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
          return res.status(404).json({ message: "Blog not found." });
        }
        if (existingBlog.image) {
          const oldImagePath = path.join(__dirname, existingBlog.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updates.image = req.file.path;
      }
      const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found." });
      }
      res.status(200).json({
        message: "Blog updated successfully.",
        data: updatedBlog,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json({
      message: "Blog deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
