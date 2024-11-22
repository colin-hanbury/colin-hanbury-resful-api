import Blog from "../models/blog.js"
export default  {
    getLatestBlogs: async (req, res) => {
        try {
            const options = {
                page: parseInt(req.query.page) || 0,
                limit: parseInt(req.query.limit) || 10,
            };
            const latestBlogs = await Blog.getBlogs();
            if(!latestBlogs){
                return res.status(400).json({
                    success: false,
                    message: 'No blogs found for this id'
                })
            }
            return res.status(200).json({success: true, latestBlogs})
        } catch (error) {
            return res.status(500).json({success: false, error});
        }
        
    },    
    getBlogById: async (req, res) => {
        try {
            const { blogId } = req.params;
            const blog = Blog.getBlogById(blogId);
            if(!blog){
                return res.status(400).json({
                    success: false,
                    message: 'No blogs found for this id'
                })
            }
            return res.status(200).json({success: true, blog})
        } catch (error) {
            return res.status(500).json({success: false, error});
        }
    },
    addBlog: async (req, res) => {
        try {
            const { title, url } = req.body;
            // const existingBlog = Blog.getBlogByTitle(title);
            // if(!existingBlog){
            //     return res.status(400).json({
            //         success: false,
            //         message: 'Blog already exists'
            //     })
            // }
            const blog = await Blog.addBlog(title, url);
            return res.status(200).json({success: true, blog})
        } catch (error) {
            return res.status(500).json({success: false, error})
        }
    }
}


