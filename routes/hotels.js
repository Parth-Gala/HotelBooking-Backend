import express from "express";
// import Hotel from "../backend/models/Hotel.js";
// import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel, getHotelBasedCity } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js"
const router =  express.Router()

//CREATE
router.post("/",verifyAdmin, createHotel);

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GETBYCITY
router.get("/city/:city", getHotelBasedCity);

//GETALL
router.get("/", getHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);

export default router;