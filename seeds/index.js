const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error :"));
db.once('open', () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //My user ID
            author: '64a662dd6582d1285eb2ba4c',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis assumenda tempore non distinctio corporis! Beatae doloribus eius placeat ipsa ea, neque officia quis error aut voluptates nostrum libero similique voluptatum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude
            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzkj7xheo/image/upload/v1688713965/YelpCamp/mm7drpcrwkvmygnykeie.jpg',
                    filename: 'YelpCamp/mm7drpcrwkvmygnykeie'
                },
                {
                    url: 'https://res.cloudinary.com/dzkj7xheo/image/upload/v1688713966/YelpCamp/cpim8camgggpumfkv0cs.jpg',
                    filename: 'YelpCamp/cpim8camgggpumfkv0cs'
                },
                {
                    url: 'https://res.cloudinary.com/dzkj7xheo/image/upload/v1688713966/YelpCamp/oy91h2ve6xonfkisytmc.jpg',
                    filename: 'YelpCamp/oy91h2ve6xonfkisytmc'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});