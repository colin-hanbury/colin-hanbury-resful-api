import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
    {
        _id: {
          type: String,
          default: () => uuidv4(),//.replace(/\-/g, ""),
        },
        forename: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
        collection: "users",
    }

);

/**
 * @param {String} forename
 * @param {String} surname
 * @param {String} email
 * @param {String} password
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (forename, surname, email, password) {
    try {
        const existingUser = await this.findOne({ email: email });
        if (existingUser) throw ({  error: 'Email already exists' });
        password = await bcrypt.hash(password, 10);
        const user = await this.create({ forename, surname, email, password });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

  userSchema.statics.loginUser = async function (email, password) {
    try {
        // Check if the email exists
        const user = await this.findOne({ email: email });
        if (!user) throw ({  error: 'Invalid credentials' });


        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw ({  error: 'Invalid credentials' });
  
        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'secret');
        user.password = null;
        user.token = token;
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
  }

  /**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
    try {
      const user = await this.findOne({ _id: id });
      if (!user) throw ({ error: 'No user with this id found' });
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @return {Array} List of all users
   */
  userSchema.statics.getUsers = async function () {
    try {
      const users = await this.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {Array} ids, string of user ids
   * @return {Array of Objects} users list
   */
  userSchema.statics.getUserByIds = async function (ids) {
    try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {String} id - id of user
   * @returns {Object} - details of action performed
   */
  userSchema.statics.deleteByUserById = async function (id) {
    try {
      const result = await this.remove({ _id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }

 export default mongoose.model('User',userSchema);
