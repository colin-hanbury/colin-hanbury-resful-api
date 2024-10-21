import express from 'express'; 
import chatController  from "../controllers/chatsController.js";
const router = express.Router();

router
.get('/', chatController.getRecentConversation)
.get('/:roomId', chatController.getConversationByRoomId)
.post('/initiate', chatController.initiate)
.post('/:roomId/message', chatController.postMessage)
.put('/:roomId/mark-read', chatController.markConversationReadByRoomId)

export default router;