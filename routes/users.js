import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUSer } from "../utils/verifyToken.js";

const router =  express.Router()

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello User, You are logged in");
// });

// router.get("/checkuser/:id", verifyUSer, (req, res, next) => {
//     res.send("Hello User, You are logged in and you can delete account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, You are logged in and you can delete all account");
// });



//Update
router.put("/:id",verifyUSer, updateUser);

//Delete
router.delete("/:id",verifyUSer, deleteUser);

//Get
router.get("/:id",verifyUSer, getUser);

//Get All
router.get("/", verifyAdmin, getUsers);

export default router;