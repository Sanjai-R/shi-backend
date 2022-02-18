import * as mongoose from 'mongoose';

export const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  held_on: {
    type: String,
  },
  held_at: {
    type: String,
  },
  application_closed: {
    type: String,
  },
});
