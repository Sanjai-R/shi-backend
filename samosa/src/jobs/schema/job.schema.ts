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
  educational_requirements: {
    type: String,
    required: true,
  },
  additional_requirements: {
    type: String,
    required: true,
  },
  application_url: {
    type: String,
    required: true,
  },
  _required_skills: {
    type: Array,
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Corporate',
    required: true,
  },
  recommended_candidates: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Student',
  },
  experience_level: {
    type: String,
  },
  date_posted: {
    type: Date,
    required: true,
  },
  is_closed: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
});
