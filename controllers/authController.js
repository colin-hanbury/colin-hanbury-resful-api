
import makeValidation from '@withvoid/make-validation';
import User from "../models/user.js";


export default {

  registerUser: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          forename: { type: types.string },
          surname: { type: types.string },
          email: { type: types.string },
          password: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { forename, surname, email, password } = req.body;
      await User.createUser(forename, surname, email, password);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ success: false, error: error })
    }
  },

  loginUser: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          email: { type: types.string },
          password: { type: types.string },
          
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });
      const { email, password } = req.body;
      const user = await User.loginUser(email, password);
      return res.status(200).json({ success: true, token: user.token, });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteUserById: async (req, res) => {
    try{
        const user = await User.remove({ _id: req.params.id});
        res.json(user);
    } catch(error) {
        console.log(error);
        res.json({message: error});
    }
  }
}