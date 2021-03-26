const mongoose = require("mongoose");
const { Schema } = mongoose;

const PosterSchema = new Schema({
  posterID: {
    type: String,
    required: true,
  },
  posterName: {
    type: String,
    required: true,
  },
});

const EventSchema = new Schema({
  caption: {
    type: String,
    required: true,
  },
  posterInfo: {
    type: PosterSchema,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("dogadjaj", EventSchema);
