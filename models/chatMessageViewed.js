import mongoose from "mongoose";

const chatMessageViewedSchema = mongoose.Schema(
    {
      _id: false,
      readByUserId: String,
      readAt: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      timestamps: false,
    }
  );

  export default chatMessageViewedSchema;// mongoose.model('ChatMessageViewed', chatMessageViewedSchema);