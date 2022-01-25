import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    maxlength: 13,
    required: true,
    minlength: 10,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  device_id: {
    type: String,
    required: true,
    unique: true,
  },
  skills: {
    type: [],
  },
  college: {
    type: String,
  },
  profile: {
    type: Array,
  },
  passed_out_year: {
    type: Number,
  },
  projects: {
    type: Array,
  },
  education: {
    type: Array,
  },
  experience_level: {
    type: Number,
  },
  location: {
    type: String,
  },
  is_steps_completed: {
    type: Boolean,
    default: false,
  },
});
