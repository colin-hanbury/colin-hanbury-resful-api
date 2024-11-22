import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const likeSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4(),//.replace(/\-/g, ""),
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "likes"
    }
);

export default likeSchema;