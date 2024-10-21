import express  from "express"; 
import  authController  from "../controllers/authController.js";
const router = express.Router();


router
  .post('/register', authController.registerUser)
  .post('/login', authController.loginUser)
  .delete('/:id', authController.deleteUserById)

export default router;