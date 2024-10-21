class WebSocketController {
    users = [];
    connection(webSocket) {
      // event fired when the chat room is disconnected
      webSocket.on("disconnect", () => {
        this.users = this.users.filter((user) => user.socketId !== webSocket.id);
      });
      // add identity of user mapped to the socket id
      webSocket.on("identity", (userId) => {
        this.users.push({
          socketId: webSocket.id,
          userId: userId,
        });
      });
      // subscribe person to chat & other user as well
      webSocket.on("subscribe", (room, otherUserId = "") => {
        this.subscribeOtherUser(room, otherUserId);
        webSocket.join(room);
      });
      // mute a chat room
      webSocket.on("unsubscribe", (room) => {
        webSocket.leave(room);
      });
    }
  
    subscribeOtherUser(room, otherUserId) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.webSocketServer.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(room);
        }
      });
    }
  }
  
export default WebSocketController;