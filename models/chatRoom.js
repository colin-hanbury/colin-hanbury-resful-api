import mongoose from "mongoose";


const chatRoomSchema = mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
      },
      userIds: Array,
      chatInitiator: String,
    },
    {
      timestamps: true,
      collection: "chatrooms",
    }
  );


  /**
 * @param {String} roomId - id of chatroom
 * @returns {Object} chatroom
 */
chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
    try {
      const room = await this.findOne({ _id: roomId });
      return room;
    } catch (error) {
      throw error;
    }
  }

  /**
 * @param {Array} userIds - array of strings of userIds
 * @param {String} chatInitiator - user who initiated the chat
 */
chatRoomSchema.statics.initiateChat = async function (userIds, chatInitiator) {
    try {
      const availableRoom = await this.findOne({
        userIds: {
          $size: userIds.length,
          $all: [...userIds],
        },
        type,
      });
      if (availableRoom) {
        return {
          isNew: false,
          message: 'retrieving an old chat room',
          chatRoomId: availableRoom._doc._id,
        };
      }
  
      const newRoom = await this.create({ userIds, chatInitiator });
      return {
        isNew: true,
        message: 'creating a new chatroom',
        chatRoomId: newRoom._doc._id,
      };
    } catch (error) {
      console.log('error on start chat method', error);
      throw error;
    }
  }

  export default chatRoomSchema;