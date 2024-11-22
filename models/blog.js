import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

import likeSchema from "./like.js";

const blogSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4(),//.replace(/\-/g, ""),
        },
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        likes: [likeSchema]
    },
    {
        timestamps: true,
        collection: "blogs"
    }
);

/**
 * @param {String} blogId
 * @returns {Object} blog
 */
blogSchema.statics.getBlogById = async (blogId) => {
    try {
        const blog = await this.findOne({_id: blogId});
        return blog;
    } catch (error) {
        
    }
}

/**
 * @param {Object} options
 * @returns {Array} List of blogs
 */
blogSchema.statics.getBlogs = async function () {
    try {
        const blogs = this.find();
        return blogs;
    } catch (error) {
        throw error;
    }
    
}

/**
 * @param {String} title
 * @param {String} url
 */
blogSchema.statics.addBlog = async function (title, url,) {
    try {
        const blogs = await this.findOne({ title: title });
        if(blogs) throw ({error: 'Blog already exists'});
        const blog = await this.create({ title, url });
        return blog;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * @param {String} id blog ID
 * @returns {Object} details of deleted blog
 */
blogSchema.statics.deleteBlogById = async function (id) {
    try {
        const result = await this.remove({_id: id});
        return result;
    } catch (error) {
        throw error;
    }
    
}


export default mongoose.model('Blog', blogSchema);