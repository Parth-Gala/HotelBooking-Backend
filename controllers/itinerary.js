import HotelDataset from "../models/HotelDataset.js";
import { spawn } from "child_process";

export const gethotelBasedCity = async (req, res, next) => {
    try {
        const hotelBasedCity = await HotelDataset.find({ city: req.params.city });
    } catch (error) {
        next(error);
    }
}