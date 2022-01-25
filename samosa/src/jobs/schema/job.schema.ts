import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  required_skills: {
    type: Array,
  },
  experience_level: {
    type: String,
  },
  job_type: {
    type: String,
  },
  date_posted: {
    type: Date,
    default: Date.now(),
  },
  is_closed: {
    type: Boolean,
    default: false,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_website: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    maxlength: 12,
    required: true,
    minlength: 10,
  },
  location: {
    type: String,
    required: true,
  },
});
