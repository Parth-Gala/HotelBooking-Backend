import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import HotelDataset from "../models/HotelDataset.js";

// Create
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// Update
export const updateHotel = async (req, res, next) => {
  try {
    const hotelupdate = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: true },
      { next: true }
    );
    res.status(200).json(hotelupdate);
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

// Get
export const getHotel = async (req, res, next) => {
  try {
    const gethotel = await Hotel.findById(req.params.id);
    res.status(200).json(gethotel);
  } catch (error) {
    next(error);
  }
};

// export const getHotelBasedCity = async (req, res, next) => {
//   try {
//     const { min, max, people, days, ...others} = req.query;
//     const parsedMin = parseInt(min, 10);
//     const parsedMax = parseInt(max, 10);
//     const parsedPeople = parseInt(people, 10);
//     const parsedDays = parseInt(days, 10);
//     const hotel = await HotelDataset.find({ city: req.params.city, ...others, Price: { $gt: parsedMin || 500, $lt: parsedMax || 30000}}).exec();
//     res.status(200).json(hotel);
//     // const hotelBasedCity = await HotelDataset.find({ city: req.params.city });
//     // res.status(200).json(hotelBasedCity);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHotelBasedCity = async (req, res, next) => {
//   try {
//     const { min, max } = req.query;
//     const parsedMin = parseInt(min, 10) || 1000;
//     const parsedMax = parseInt(max, 10) || 30000;

//     const removeCommasAndParse = (value) => parseInt(value.replace(/,/g, ''), 10);

//     const hotel = await HotelDataset.find({
//       city: req.params.city,
//       Price: {
//         $gte: removeCommasAndParse(parsedMin),
//         $lte: removeCommasAndParse(parsedMax)
//       }
//     }).exec();

//     res.status(200).json(hotel);
//   } catch (error) {
//     console.error('Error in Database Query:', error);
//     next(error);
//   }
// };

export const getHotelBasedCity = async (req, res, next) => {
  // try {
  //   const { min, max } = req.query;

  //   const hotel = await HotelDataset.find({
  //     city: req.params.city,
  //     Price: {
  //       $gte: min,
  //       $lte: max
  //     }
  //   }).sort({Price: "asc"}).exec();

  //   // const sortedHotelbyprice = hotel.sort( );
  //   // console.log('hotel', sortedHotelbyprice)
  //   console.log('hotel', hotel)
  //   console.log('min', min)
  //   console.log('max', max)

  //   res.status(200).json(hotel);
  // } catch (error) {
  //   console.error('Error in Database Query:', error);
  //   next(error);
  // }

  try {
    const hotels = await HotelDataset.find({}).exec();
    const hotelsWithNumericPrice = hotels.map((hotel) => ({
      ...hotel._doc,
      Price: parseInt(hotel.Price.replace(/,/g, ''), 10)
    }));
    const sortedHotels = hotelsWithNumericPrice.sort((a, b) => a.Price - b.Price);
    // console.log('sortedHotels', sortedHotels);
    res.status(200).json(sortedHotels);
  } catch (error) {
    console.error('Error in Database Query:', error);
    next(error);
  }


};



export const getHotels = async (req, res, next) => {
  try {
    const { min, max, limit, ...others } = req.query;    
    const parsedLimit = parseInt(limit, 10);
    const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 500, $lt: max || 30000 }}).limit(parsedLimit).exec();
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount }
    ]);
  } catch (error) {
    next(error);
  }

};

export const getHotelRooms = async (req, res, next) => {
  
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.rooms.map((room)=>{
      return Room.findById(room)
    }))
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

