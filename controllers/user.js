import User from "../models/User.js";

// Update
export const updateUser = async (req, res, next) => {
  try {
    const userupdate = await User.findByIdAndUpdate(
      req.params.id,
      { $set: ture },
      { next: true }
    );
    res.status(200).json(userupdate);
  } catch (error) {
    next(err);
  }
};

// Delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(err);
  }
};

// Get
export const getUser = async (req, res, next) => {
  try {
    const getuser = await User.findById(req.params.id);
    res.status(200).json(getuser);
  } catch (error) {
    next(err);
  }
};

// Get All
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

