const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    coursename: { type: String, required: true, unique: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    batches: {
      type: Array
    }
  }),
  "course"
);

module.exports = Course;
