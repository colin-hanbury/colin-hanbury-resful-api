import mongoose from "mongoose";
import chatMessageViewedSchema from "./chatMessageViewed.js";


const chatMessageSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4(),//.replace(/\-/g, ""),
        },
        chatRoomId: String,
        message: mongoose.Schema.Types.Mixed,
        sender: String,
        receivers: [chatMessageViewedSchema]
    },
    {
      timestamps: true,
      collection: "chatmessages",
    }
  );

  /**
   * @param {String} roomId
   * @param {String} viewerId
   * @returns {Object} result details
   */
  chatMessageSchema.statics.markMessageAsRead = async function (roomId, viewerId) {
    const result = await this.update()
  }

  export default chatMessageSchema;